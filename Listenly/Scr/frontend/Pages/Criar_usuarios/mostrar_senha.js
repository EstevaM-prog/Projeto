function mostrarSenha() {
                const senha = document.getElementById("senha");
                const icone = document.getElementById("iconeSenha");

                if (senha.type === "password") {
                    senha.type = "text";
                    icone.classList.replace("bi-eye", "bi-eye-slash");
                } else {
                    senha.type = "password";
                    icone.classList.replace("bi-eye-slash", "bi-eye");
                }
            }

            function mostrarSenha2() {
                const senha2 = document.getElementById("senha2");
                const icone2 = document.getElementById("iconeSenha2");

                if (senha2.type === "password") {
                    senha2.type = "text";
                    icone2.classList.replace("bi-eye", "bi-eye-slash");
                } else {
                    senha2.type = "password";
                    icone2.classList.replace("bi-eye-slash", "bi-eye");
                }
            }