<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

   header("Access-Control-Allow-Origin: *");
   include_once "BDD.php";

   if(isset($_POST["id_user"]) && isset($_POST["save_file"])){
       $id = $_POST["id_user"];
       $saveFile = $_POST["save_file"];
       try {
           $query = $db->prepare("UPDATE `USER` SET `save_file` = :id  WHERE `USER`.`id` = :id ");
           $query->bindParam(":id", $id);
           $query->bindParam(":saveFile", $saveFile);
           $query->execute();
   
           $res["status"] = "success";
           $res["message"] = "modification réussie";
           $res["data"] = true;
       } catch(PDOException $e) {
           $res["status"] = "error";
           $res["message"] = "Une erreur est survenue : " . $e->getMessage();
           $res["data"] = false;

       }
   } else {
       $res["status"] = "error";
       $res["message"] = "Suppression échouée : données manquantes ou invalides";
       $res["data"] = false;
   
   }
   

    
   

?>