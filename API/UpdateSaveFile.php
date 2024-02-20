<?php
include_once 'BDD.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Assuming data is sent as JSON
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if ($data && isset($data['userId']) && isset($data['saveFileData'])) {
    $userId = $data['userId'];
    $saveFileData = $data['saveFileData']; // Convert the data to JSON format

    try {
        // Check if the user already has a save_file_id
        $query = $db->prepare("SELECT save_file FROM USER WHERE id = :userId");
        $query->bindParam(":userId", $userId, PDO::PARAM_INT);
        $query->execute();

        $result = $query->fetch(PDO::FETCH_ASSOC);

        if ($result && isset($result['save_file'])) {
            // Update existing save_file record
            $query = $db->prepare("UPDATE SAVE_FILE SET data = :saveFileData WHERE id = :saveFileId");
            $query->bindParam(":saveFileData", $saveFileData);
            $query->bindParam(":saveFileId", $result['save_file'], PDO::PARAM_INT);
            $query->execute();
        } 

        $res["status"] = "success";
        $res["message"] = "Save file updated successfully";
    } catch (PDOException $e) {
        $res["status"] = "error";
        $res["message"] = "Database error: " . $e->getMessage();
    }
} else {
    $res["status"] = "error";
    $res["message"] = "Invalid data";
}

echo json_encode($res);
?>
