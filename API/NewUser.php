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
    // $nom = $data['nom'];
    // $prenom = $data['prenom'];
    // $mel = $data['mel'];
    // $date_naiss = $data['date_naiss'];
    $password = $data['password'];
    $salt = $data['salt'];
    $save_file = $data['save_file'];

    $query = $db->prepare("INSERT INTO `USER` (`id`, `login`, `password`, `salt`, `save_file`) VALUES (NULL, :login, :password, :salt, :save_file)");

    $query->bindValue(':login', $login);
    // $query->bindValue(':nom', $nom);
    // $query->bindValue(':prenom', $prenom);
    // $query->bindValue(':mel', $mel);
    // $query->bindValue(':date_naiss', $date_naiss);
    $query->bindValue(':password', $password);
    $query->bindValue(':salt', $salt);
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
