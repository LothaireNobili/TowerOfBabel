<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


header("Access-Control-Allow-Origin: *");
include_once "BDD.php";


// Récupérez les données JSON transmises par le front-end
$data = json_decode(file_get_contents("php://input"), true);


if ($data) {
    $id = $data['id'];
    $login = $data['login'];
    $password = $data['password'];
    $salt = $data['salt'];

    try {
        $query = $db->prepare("UPDATE `USER` SET `login` = :login, `password` = :password, `salt` = :salt WHERE `USER`.`id` = :id");
        $query->bindParam(":id", $id);
        $query->bindParam(":login", $login);
        $query->bindParam(":password", $password);
        $query->bindParam(":salt", $salt);
        $query->execute();


        $res["status"] = "success";
        $res["message"] = "modification réussie";
        $res["data"] = true;
    } catch (PDOException $e) {
        $res["status"] = "error";
        $res["message"] = "Une erreur est survenue : " . $e->getMessage();
        $res["data"] = false;
    }
} else {
    $res["status"] = "error";
    $res["message"] = "Modification échouée : données manquantes ou invalides";
    $res["data"] = false;
}

echo json_encode($res);
?>





