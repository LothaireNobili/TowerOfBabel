function updateUserSaveFile(login,nom,prenom,mel,date_naiss,password, salt) {
 
    $.post(
      PATH + "NewUserDebug.php",
      {
       /* login: login,
        nom: nom,
        prenom: prenom,
        mel:mel,
        date_naiss: date_naiss,
        password: password,
        salt: salt,*/
      },
    );
  }
  
  var login = "Kujotaro";
  var saveFile = "it doesnt just works"
  var nom = "Kujo";
  var prenom = "Jotaro"
  var mel = "OraMF@dolphin.com"
  var date_naiss = "07/08/1980"
  var password="Dolphin Loverer"
    var salt = "very Salty indeed"
  updateUserSaveFile(login,nom, prenom,mel,date_naiss,password, salt);
  
  