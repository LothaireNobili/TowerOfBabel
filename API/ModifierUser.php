<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

   header("Access-Control-Allow-Origin: *");
   include_once "BDD.php";

   if($data){
        $id = $data['id'];
        $login = $data['login'];
        $password = $data['password'];
        $salt = $data['salt'];

           $query = $db->prepare("UPDATE `USER` SET  `login` = :login, `password` = :password,`salt` = :salt WHERE `USER`.`id` = :id");
           $query->bindParam(":id", $id);
           $query->bindParam(":login", $login);
           $query->bindParam(":password", $password);
           $query->bindParam(':salt', $salt);
           $query->execute();
   
           if ($query) {
            $res["status"] = "success";
            $res["message"] = "modification réussie";
            $res["user"] = true;
        } else {
            $res["status"] = "error";
            $res["message"] = "Erreur lors de l'inscription";
            $res["user"] = false;
        }
   } else {
       $res["status"] = "error";
       $res["message"] = "Suppression échouée : données manquantes ou invalides";
       $res["data"] = false;
   
   }
   