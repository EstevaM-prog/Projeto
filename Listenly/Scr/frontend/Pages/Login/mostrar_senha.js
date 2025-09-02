function mostrarSenha(){
                        const senha = document.getElementById("senha");
                        const icone = document.getElementById("iconeSenha")

                        if (senha.type === "password") {
                            senha.type = "text";
                            icone.classList.replace("bi-lock", "bi-unlock")
                        } else {
                            senha.type = "password";
                            icone.classList.replace("bi-unlock", "bi-lock")
                        }
                    }