document.addEventListener("DOMContentLoaded", function () {
  // Obtenir les boutons
  // const registerButton = document.querySelector("#valider");
  const connecterButton = document.querySelector("#connecter");

  function registerButtonCilck () {
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

    // console.log(formData)

    // Utilisez fetch pour envoyer une requête POST

    // fetch('../../API/NewUser.php', {
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
    //         // 在这里处理从后端接收到的数据
    //         console.log(data);
    //         if (data.status === 'success') {
    //             // 注册成功，可以执行相应的操作，例如跳转到登录页面
    //         } else {
    //             // 注册失败，处理错误情况
    //             alert('Inscription échouée: ' + data.message);
    //         }
    //     })
    //     .catch(error => {
    //         console.error('There was a problem with the fetch operation:', error);
    //     });
  }

  connecterButton.addEventListener("click", function () {
    // Récupérer la valeur d'un champ de formulaire
    const login = document.getElementById("login").value;
    const password = document.getElementById("mdp").value;
    const error = document.getElementById("error");

    fetch("https://devweb.iutmetz.univ-lorraine.fr/~sahinine1u/TowerOfBabel/API/SelectAllUser.php")
    .then(response => response.json())
    .then(data => {

      // 在这里处理从PHP返回的JSON数据, 遍历数据，处理用户信息
      for (let userInfo of data) {
        if(userInfo.login == login && userInfo.password == password){
            error.style.display = "none";
            let user = new User(userInfo.login,10000) // ....
            user.saveToLocalStorage();
            console.log("login success");
            window.location.href = "../../index.html"
        }
      }
      error.style.display = "block";
    })
    .catch(error => console.error('Error:', error));
  });
});

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
