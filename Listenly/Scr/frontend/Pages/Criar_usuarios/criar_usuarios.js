const apiRoute = "http://localhost:5000/v1/users/signup";

const buttonEnter = document.getElementById("enviar");

buttonEnter.addEventListener("click", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value.trim();
    const username = document.getElementById("username").value.trim();

    if(!email || !password || !username){
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const resp = await fetch(apiRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                senha: password,
                nome: username,
                data_nascimento: "2000-01-01"
            })
        });

        alert("Usuário registrado com sucesso!");
        window.location.href = "/Listenly/Scr/frontend/Pages/Login/login.html";

    } catch (err) {
        console.error(err);
        alert('Erro ao registrar: ' + err.message);
    }
});
