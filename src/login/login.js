// document.addEventListener("DOMContentLoaded", function () {
// Obtenir les boutons
const registerButton = document.querySelector("#valider");
const connecterButton = document.querySelector("#connecter");

$(document).ready(function () {
  $("#datetimepicker").datetimepicker({
    format: "YYYY-MM-DD", // Mettre en forme la date
    viewMode: "years", // Définissez le mode d’affichage sur Année
    maxDate: moment(), // Définissez la date maximale sur la date du jour
    useCurrent: false, // Désactiver la sélection automatique de la date du jour
    icons: {
      time: "far fa-clock",
      date: "far fa-calendar",
      up: "fas fa-arrow-up",
      down: "fas fa-arrow-down",
      previous: "fas fa-chevron-left",
      next: "fas fa-chevron-right",
      today: "fas fa-calendar-day",
      clear: "far fa-trash-alt",
      close: "fas fa-times",
    },
  });
});

async function register() {
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
  if (
    nom.trim() === "" ||
    prenom.trim() === "" ||
    mel.trim() === "" ||
    birthday.trim() === "" ||
    login.trim() === "" ||
    password.trim() === ""
  ) {
    // Si l’un des champs est vide, un message d’erreur s’affiche
    message.textContent = "Veuillez remplir tous les champs.";
    message.classList.remove("hide");
  } else if (await isLoginExist(login)) {
    message.textContent = "Le compte existe déja.";
    message.classList.remove("hide");
  } else if (!isValidEmail(mel)) {
    message.textContent = "Veuillez entrer une adresse e-mail valide.";
    message.classList.remove("hide");
  } else if (!isValidPassword(password)) {
    message.textContent =
      "Mot de passe doit être entre 8 et 20 caractères.";
    message.classList.remove("hide");
  }
  else {
    const userData = {
      login: login,
      nom: nom,
      prenom: prenom,
      mel: mel,
      date_naiss: birthday,
      password: password,
      salt: 'salt',
      save_file: 0,
    };
    // Effacer le message d’erreur
    message.classList.add("hide");


    // Effectuer une requête Fetch
    fetch("../../API/NewUser.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          goToConnexion();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function connecter() {
  // Récupérer la valeur d'un champ de formulaire
  const login = document.getElementById("login").value;
  const password = document.getElementById("mdp").value;
  const message = document.getElementById("message_login");

  fetch("../../API/SelectAllUser.php")
    .then((response) => response.json())
    .then((data) => {
      // Traiter les données JSON renvoyées par PHP, parcourir les données et traiter les informations utilisateur
      let loginCorrrect = false;
      for (let userInfo of data) {
        if (userInfo.login == login && userInfo.password == password) {
          loginCorrrect = true;
          let tmpUser = new User(userInfo.id, userInfo.login, 10000); // ....
          tmpUser.saveToLocalStorage();
          console.log("login success");
          window.location.href = "../../index.html";
        }
      }
      message.style.display = loginCorrrect ? "none" : "block";
    })
    .catch((error) => console.error("Error:", error));
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

function isValidPassword(psd) {
  const verifRegex = /^.{8,20}$/;
  return verifRegex.test(psd);
}

async function isLoginExist(login) {
  try {
    const response = await fetch("../../API/SelectAllUser.php");
    const data = await response.json();

    for (let userInfo of data) {
      if (userInfo.login === login) {
        return true;
      }
    }
  } catch (error) {
    // console.error("Error:", error);
  }

  return false;
}
