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
  const login = document.getElementById("login_inscription").value;
  const password = document.getElementById("mdp_inscription").value;
  const password2 = document.getElementById("mdp2_inscription").value;
  const message = document.getElementById("message_register");

  // message d'erreur
  // Valider les données du formulaire
  if (
    login.trim() === "" ||
    password.trim() === ""
  ) {
    // Si l’un des champs est vide, un message d’erreur cs’affiche
    message.textContent = "Veuillez remplir tous les champs.";
    message.classList.remove("hide");
  } else if (await isLoginExist(login)) {
    message.textContent = "Le compte existe déja.";
    message.classList.remove("hide");
  } else if (!isValidPassword(password)) {
    message.textContent =c
      "Mot de passe doit être entre 6 et 20 caractères.";
    message.classList.remove("hide");
  } else if (password != password2) {
    message.textContent = "Les deux saisies de mot de passe ne correspondent pas.";
    message.classList.remove("hide");
  }
  else {
    let tmpUser = new User(undefined, undefined, 10000, [], [], 0); 
    let save_file = tmpUser.getSaveFile();

    const userData = {
      login: login,
      password: password,
      save_file: save_file,
    };

    // Effacer le message d’erreur
    message.classList.add("hide");

    // Effectuer une requête Fetch
    //!here to change local/web
    //fetch("https://devweb.iutmetz.univ-lorraine.fr/~nobili2u/TowerOfBabel/PI/NewUser.php", {
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

          fetch("../../API/GetSaveFile.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userInfo.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "success") {
                let tmpUser = new User(userInfo.id, userInfo.login, undefined, undefined, undefined, 1)
                tmpUser.loadFromSaveFile(data.data)
                loginCorrrect = true
                //explicitely say the user is logged in with session storage
                sessionStorage.setItem("isLoggedIn", "true");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });

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
// function isValidEmail(email) {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

function isValidPassword(psd) {
  const verifRegex = /^.{6,20}$/;
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

