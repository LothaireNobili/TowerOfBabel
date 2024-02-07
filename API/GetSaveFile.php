<?php
include_once 'BDD.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Assuming data is sent as JSON
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if ($data && isset($data['userId'])) {
    $userId = $data['userId'];

    try {
        $query = $db->prepare("SELECT data FROM SAVE_FILE WHERE id = (SELECT save_file FROM USER WHERE id = :userId)");
        $query->bindParam(":userId", $userId, PDO::PARAM_INT);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $res["status"] = "success";
            $res["message"] = "Data retrieval successful";
            $res["data"] = json_decode($result['data']);
        } else {
            $res["status"] = "error";
            $res["message"] = "User not found or data not available";
            $res["data"] = null;
        }
    } catch (PDOException $e) {
        $res["status"] = "error";
        $res["message"] = "Database error: " . $e->getMessage();
        $res["data"] = null;
    }
} else {
    $res["status"] = "error";
    $res["message"] = "Invalid data";
    $res["data"] = null;
}

echo json_encode($res);
?>
