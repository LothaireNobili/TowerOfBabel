function updateUserSaveFile(id, saveFile) {
 
  $.post(
    PATH + "UpdateSaveFile.php",
    {
      id_user: id,
      save_file: saveFile,
    },
    function (response) {
      if (response == "OK") {
        console.log("Everything's fine");
      } else {
        console.log("It's not working");
      }
    }
  );
}

var id = 1;
var saveFile = "save File to be determined"
updateUserSaveFile(id, saveFile);
