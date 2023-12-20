<?php
   /* error_reporting(E_ALL);
    ini_set('display_errors', 1);
    header('Content-Type: application/json');
    */
    header("Access-Control-Allow-Origin: *");
    include_once 'BDD.php';

    $query = $db->prepare("SELECT * FROM `USER`");
    $query->execute();
    $result = $query->fetchAll(PDO::FETCH_ASSOC);

    $res["status"] = "success";
    $res["message"] = "Recuperation des données réussie";
    $res["data"] = $result;

    echo json_encode($res["data"]);
?>