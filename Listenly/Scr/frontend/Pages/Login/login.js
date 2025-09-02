function logar(){
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    if(email == "admin@gmail.com" && senha == "admin"){
        alert("Sucesso");
        location.href = "/Listenly/Public/index.html";
    } else {
        alert("Usuario ou senha incorreto");
    }
}