// document.addEventListener("DOMContentLoaded", function () {
// Obtenir les boutons
const registerButton = document.querySelector("#valider");
const connecterButton = document.querySelector("#connecter");

$(document).ready(function () {
  $('#datetimepicker').datetimepicker(
    {
      format: 'DD/MM/YYYY', // Mettre en forme la date
      viewMode: 'years', // Définissez le mode d’affichage sur Année
      maxDate: moment(), // Définissez la date maximale sur la date du jour
      useCurrent: false, // Désactiver la sélection automatique de la date du jour
      icons: {
        time: 'far fa-clock',
        date: 'far fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-chevron-left',
        next: 'fas fa-chevron-right',
        today: 'fas fa-calendar-day',
        clear: 'far fa-trash-alt',
        close: 'fas fa-times'
      }
    }
  );
});

function register() {
  // Récupérer la valeur d'un champ de formulaire
  const nom = document.querySelector('[aria-label="nom"]').value;
  const prenom = document.querySelector('[aria-label="prenom"]').value;
  const mel = document.getElementById("mel").value;
  const birthday = document.getElementById("datetimepicker").value;
  const login = document.getElementById("login_inscription").value;
  const password = document.getElementById("mdp_inscription").value;
  const message = document.getElementById("message_register");

  // message d'erreur
  // Valider les données du formulaire
  if (nom.trim() === "" || prenom.trim() === "" || mel.trim() === "" || birthday.trim() === "" || login.trim() === "" || password.trim() === "") {
    // Si l’un des champs est vide, un message d’erreur s’affiche
    message.textContent = "Veuillez remplir tous les champs.";
    message.classList.remove("hide");
  } else if (!isValidEmail(mel)) {
    message.textContent = "Veuillez entrer une adresse e-mail valide.";
    message.classList.remove("hide");
  } else if (!isValidEmail(mel)) {
    message.textContent = "Veuillez entrer une adresse e-mail valide.";
    message.classList.remove("hide");
  }
  else {

    // Effacer le message d’erreur
    message.classList.add("hide");

    // Effectuer une requête Fetch
    fetch("https://devweb.iutmetz.univ-lorraine.fr/~sahinine1u/TowerOfBabel/API/NewUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        nom,
        prenom,
        mel,
        birthday,
        login,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          goToConnexion()
        } 
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
}

function connecter() {
  // Récupérer la valeur d'un champ de formulaire
  const login = document.getElementById("login").value;
  const password = document.getElementById("mdp").value;
  const message = document.getElementById("message_login");

  let loginTrue = false;

  fetch("https://devweb.iutmetz.univ-lorraine.fr/~sahinine1u/TowerOfBabel/API/SelectAllUser.php")
    .then(response => response.json())
    .then(data => {
      // Traiter les données JSON renvoyées par PHP, parcourir les données et traiter les informations utilisateur
      let loginCorrrect = true;
      for (let userInfo of data) {
        if (userInfo.login == login && userInfo.password == password) {
          loginTrue = true
          let user = new User(userInfo.id, userInfo.login, 10000) // ....
          user.saveToLocalStorage();
          console.log("login success");
          window.location.href = "../../index.html"
        }
      }
      message.style.display = loginTrue ? "none" : "block";
    })
    .catch(error => console.error('Error:', error));
}

function goToInscription() {
  let inscription = document.getElementById("inscrption-card");
  let connexion = document.getElementById("connexion-card");
  inscription.classList.remove("hide");
  connexion.classList.add("hide");
}

function goToConnexion() {
  let inscription = document.getElementById("inscrption-card");
  let connexion = document.getElementById("connexion-card");
  inscription.classList.add("hide");
  connexion.classList.remove("hide");
}

// Vérifier le format de l’e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}