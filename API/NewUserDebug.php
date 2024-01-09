<?php
include_once 'BDD.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// Les données à insérer
$login = 'testeur';
$nom = 'kami';
$prenom = 'davefile';
$mel = 'gmail@hotmail.com';
$date_naiss = '2022-01-18'; // Format YYYY-MM-DD
$password = '3443';
$salt = 'salt';
$save_file = 0;

$query = $db->prepare("INSERT INTO `USER` (`id`, `login`, `nom`, `prenom`, `mel`, `date_naiss`, `password`, `salt`, `save_file`) VALUES (NULL, :login, :nom, :prenom, :mel, :date_naiss, :password, :salt, :save_file)");

$query->bindValue(':login', $login);
$query->bindValue(':nom', $nom);
$query->bindValue(':prenom', $prenom);
$query->bindValue(':mel', $mel);
$query->bindValue(':date_naiss', $date_naiss);
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

echo json_encode($res);
?>
