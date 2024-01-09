// document.addEventListener("DOMContentLoaded", function () {
// Obtenir les boutons
const registerButton = document.querySelector("#valider");
const connecterButton = document.querySelector("#connecter");

function register() {
  // Récupérer la valeur d'un champ de formulaire
  const nom = document.querySelector('[aria-label="nom"]').value;
  const prenom = document.querySelector('[aria-label="prenom"]').value;
  const mel = document.getElementById("mel").value;
  const birthday = document.getElementById("birthday").value;
  const login = document.getElementById("login_inscription").value;
  const password = document.getElementById("mdp_inscription").value;

  const formData = new FormData();
  formData.append("nom", nom);
  formData.append("prenom", prenom);
  formData.append("mel", mel);
  formData.append("date_naiss", birthday);
  formData.append("login", login);
  formData.append("password", password);

  console.log(formData)

  // Utilisez fetch pour envoyer une requête POST
  // fetch('https://devweb.iutmetz.univ-lorraine.fr/~sahinine1u/TowerOfBabel/API/NewUser.php', {
  //     method: 'POST',
  //     body: formData,
  // })
  //     .then(response => {
  //         if (!response.ok) {
  //             throw new Error('Network response was not ok');
  //         }
  //         return response.json();
  //     })
  //     .then(data => {
  //         console.log(data);
  //         if (data.status === 'success') {
  //         } else {
  //             alert('Inscription échouée: ' + data.message);
  //         }
  //     })
  //     .catch(error => {
  //         console.error('There was a problem with the fetch operation:', error);
  //     });
}

function connecter() {
  // Récupérer la valeur d'un champ de formulaire
  const login = document.getElementById("login").value;
  const password = document.getElementById("mdp").value;
  const error = document.getElementById("error");

  let loginTrue = false;

  fetch("https://devweb.iutmetz.univ-lorraine.fr/~sahinine1u/TowerOfBabel/API/SelectAllUser.php")
    .then(response => response.json())
    .then(data => {
      // Traiter les données JSON renvoyées par PHP, parcourir les données et traiter les informations utilisateur
      let loginCorrrect = true;
      for (let userInfo of data) {
        if (userInfo.login == login && userInfo.password == password) {
          loginTrue = true
          let user = new User(userInfo.id,userInfo.login, 10000) // ....
          user.saveToLocalStorage();
          console.log("login success");
          window.location.href = "../../index.html"
        }
      }
      error.style.display = loginTrue ? "none" : "block";
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
