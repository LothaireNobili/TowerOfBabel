<?php
    include_once 'Bdd.php';

    
    
    if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['mel']) && isset($_POST['date_naiss']) && isset($_POST['login']) && isset($_POST['password'])) {

        if($tpm["status"] == "success") {
            $query = $db->prepare("INSERT INTO `USER`(`id`,`login`,`nom`,`prenom`,`mel`,`date_naiss`, `password`, `salt`, `save_file`) VALUES (NULL,:login, :nom, :prenom, :mel, :date_naiss, :mdp, :salt, 0)");
            $query->bindParam(':nom', $_POST['nom']);
            $query->bindParam(':prenom', $_POST['prenom']);
            $query->bindParam(':mel', $_POST['mel']);
            $query->bindParam(':date_naiss', $_POST['date_naiss']);
            $query->bindParam(':login', $_POST['login']);
            $query->bindParam(':mdp', $tpm["mdp"]);
            $query->bindParam(':salt', $tpm["salt"]);
            $query->execute();

            $res["status"] = "success";
            $res["message"] = "Inscription réussie";
            $res["user"] = true;

            echo json_encode($res);
        }
        else {
            $res["status"] = "failed";
            $res["message"] = "Inscription échouée mot de passe non conforme";
            $res["user"] = false;

            echo json_encode($res);
        }
    }
    else {
        $res["status"] = "failed";
        $res["message"] = "Inscription échouée données manquantes";
        $res["user"] = false;

        echo json_encode($res);
    }