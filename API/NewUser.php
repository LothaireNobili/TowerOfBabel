<?php
    include_once 'Bdd.php';

    function Mycrypt($mdp){
        $verif = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,20}$/";
        $S = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~';
        $salt = "";
        if(preg_match($verif, $mdp)) {
            $res["status"] = "success";
            $res["mdp"] = "";
            for($i = 0; $i < 20; $i++) {
                $salt .= $S[rand(0, strlen($S)-1)];
            }
            for($i = 0; $i < strlen($mdp); $i++) {
                $pos = (strpos($S, $mdp[$i]) + strpos($S, $salt[$i])) % strlen($S);
                $res["mdp"] .= $S[$pos];
            }
            $res["salt"] = $salt;
            return $res;
        }
        else {
            $res["status"] = "failed";
            return $res;
        }        
    }   
    
    
    if(isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['mel']) && isset($_POST['date_naiss']) && isset($_POST['login']) && isset($_POST['password'])) {
        
        $tpm = Mycrypt($_POST['password']);
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