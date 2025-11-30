const apiRoute = 'http://localhost:5000/v1/users/login';

const enviar = document.getElementById('enviar');

enviar.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('senha').value.trim();

    if (!email || !password) {
        alert("Preencha e-mail e senha.");
        return;
    }

    try {
        const resp = await fetch(apiRoute, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                senha: password
            })
        });

        if (!resp.ok) {
            const errorData = await resp.json();
            alert("Erro: " + (errorData.message || "Falha no login"));
            return;
        }

        const data = await resp.json();
        console.log("Resposta da API:", data);

        alert("Login realizado com sucesso!");

        console.log(data.user)

        localStorage.setItem("session_token", data.token);
        localStorage.setItem("user_nome", data.user.nome);
        localStorage.setItem("user_email", data.user.email);
        localStorage.setItem("user_id", data.user.id);


        window.location.href = "../Home/home.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao conectar com o servidor.");
    }
});
