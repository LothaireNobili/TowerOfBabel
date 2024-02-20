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
<<<<<<< HEAD
    // $nom = $data['nom'];
    // $prenom = $data['prenom'];
    // $mel = $data['mel'];
    // $date_naiss = $data['date_naiss'];
=======
>>>>>>> main
    $password = $data['password'];
    $save_data = $data['save_file'];

<<<<<<< HEAD
    $query = $db->prepare("INSERT INTO `USER` (`id`, `login`, `password`, `salt`, `save_file`) VALUES (NULL, :login, :password, :salt, :save_file)");

    $query->bindValue(':login', $login);
    // $query->bindValue(':nom', $nom);
    // $query->bindValue(':prenom', $prenom);
    // $query->bindValue(':mel', $mel);
    // $query->bindValue(':date_naiss', $date_naiss);
=======
    // Créer un nouvel enregistrement save_file
    $save_query = $db->prepare("INSERT INTO `SAVE_FILE` (`data`) VALUES (:save_data)");
    $save_query->bindValue(':save_data', $save_data);
    $save_query->execute();

    // Obtenez l'ID de l'enregistrement save_file qui vient d'être inséré
    $save_id = $db->lastInsertId();
    
    $query = $db->prepare("INSERT INTO `USER` (`id`, `login`, `password`, `save_file`) VALUES (NULL, :login, :password, :save_file)");

    $query->bindValue(':login', $login);
>>>>>>> main
    $query->bindValue(':password', $password);
    $query->bindValue(':save_file', $save_id, PDO::PARAM_INT);

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
