<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

   header("Access-Control-Allow-Origin: *");
   include_once "BDD.php";

   if(isset($_POST["id_user"]) && isset($_POST["save_file"])){
       $id = $_POST["id_user"];
       $saveFile = $_POST["save_file"];
       $nom = $_POST["nom"];
       $prenom = $_POST["prenom"];
       $mel = $_POST["mel"];
       try {
           $query = $db->prepare("UPDATE `USER` SET `save_file` = :id ,`prenom` = :prenom,`mel` = :mel , `nom` = :nom  WHERE `USER`.`id` = :id ");
           $query->bindParam(":id", $id);
           $query->bindParam(":saveFile", $saveFile);
           $query->bindParam(":nom", $nom);
           $query->bindParam(":prenom", $prenom);
           $query->bindParam(":mel", $mel);
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