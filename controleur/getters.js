function getAllUser() {

  $.getJSON(PATH+"SelectAllUser.php", function (data) {
   
  if (typeof data === "object") {
      return data;
    } else {
      // Si le contenu n'est pas JSON, vous pouvez afficher un message d'erreur par exemple
      console.error("Les données reçues ne sont absolument pas au format JSON");
    } 
  }).fail((jqXHR, textStatus, errorThrown) => {
    // Code à exécuter si la requête AJAX échoue
    console.error("Erreur :", textStatus, errorThrown);
  });
}

// getAllUser();
