<?php
include_once 'BDD.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Assuming data is sent as JSON
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

if ($data) {
    $login = $data['login'];
    $password = $data['password'];
    $save_file = $data['save_file'];

    $query = $db->prepare("INSERT INTO `USER` (`id`, `login`, `password`, `save_file`) VALUES (NULL, :login, :password, :save_file)");

    $query->bindValue(':login', $login);
    $query->bindValue(':password', $password);
    $query->bindValue(':save_file', $save_file, PDO::PARAM_INT);

    $query->execute();

    // Vérification du succès de l'insertion
    if ($query) {
        $res["status"] = "success";
        $res["message"] = "Inscription réussie";
        $res["user"] = true;
    } else {
        $res["status"] = "error";
        $res["message"] = "Erreur lors de l'inscription";
        $res["user"] = false;
    }
} else {
    $res["status"] = "error";
    $res["message"] = "Données manquantes";
    $res["user"] = false;
}

echo json_encode($res);
?>
