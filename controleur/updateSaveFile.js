function updateUserSaveFile(id, saveFile, nom, prenom, mel) {
 
  $.post(
    PATH + "UpdateSaveFile.php",
    {
      id_user: id,
      save_file: saveFile,
      nom: nom,
      prenom: prenom,
      mel:mel
    },
  );
}

var id = 1;
var saveFile = "it doesnt just works"
var nom = "Yoshikage";
var prenom = "Kira"
var mel = "HandlessKila@Morio.com"
updateUserSaveFile(id, saveFile,nom, prenom,mel);

