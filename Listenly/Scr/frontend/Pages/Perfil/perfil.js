// Mapeia os elementos do DOM para variáveis para fácil acesso
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const editButton = document.getElementById('edit-button');
            const editModal = document.getElementById('edit-modal');
            const cancelEditButton = document.getElementById('cancel-edit');
            const editForm = document.getElementById('edit-form');
            const sunIcon = document.getElementById('sun-icon');
            const moonIcon = document.getElementById('moon-icon');

            // Mapeia os elementos de exibição e formulário para fácil acesso
            const profilePhoto = document.getElementById('profile-photo');
            const modalProfilePhoto = document.getElementById('modal-profile-photo');
            const usernameDisplay = document.getElementById('username-display');
            const handleDisplay = document.getElementById('handle-display');
            const fullNameDisplay = document.getElementById('full-name-display');
            const emailDisplay = document.getElementById('email-display');
            const phoneDisplay = document.getElementById('phone-display');
            const genderDisplay = document.getElementById('gender-display');
            const countryDisplay = document.getElementById('country-display');

            const usernameInput = document.getElementById('username');
            const fullNameInput = document.getElementById('fullName');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const genderInput = document.getElementById('gender');
            const countryInput = document.getElementById('country');
            const photoUploadInput = document.getElementById('photo-upload');

            // Define os dados de usuário como um objeto para facilitar a manipulação
            const userData = {
                photo: "https://placehold.co/150x150/4B4B4B/FFFFFF?text=Usuário",
                username: "Nome de Usuário",
                handle: "@usuario_musica",
                fullName: "Nome e Sobrenome",
                email: "email.usuario@exemplo.com",
                phone: "(11) 98765-4321",
                gender: "Não informado",
                country: "Brasil",
                joinDate: "1 de janeiro de 2024"
            };
            
            // --- Funções de Ação ---

            // Função para atualizar os elementos da página com os dados do usuário
            function updateProfileDisplay() {
                profilePhoto.src = userData.photo;
                usernameDisplay.textContent = userData.username;
                handleDisplay.textContent = userData.handle;
                fullNameDisplay.textContent = userData.fullName;
                emailDisplay.textContent = userData.email;
                phoneDisplay.textContent = userData.phone;
                genderDisplay.textContent = userData.gender;
                countryDisplay.textContent = userData.country;
            }

            // Função para mostrar o modal de edição
            function showEditModal() {
                // Preenche o formulário com os dados atuais
                modalProfilePhoto.src = userData.photo;
                usernameInput.value = userData.username;
                fullNameInput.value = userData.fullName;
                emailInput.value = userData.email;
                phoneInput.value = userData.phone;
                genderInput.value = userData.gender === 'Masculino' ? 'male' : userData.gender === 'Feminino' ? 'female' : 'not-specified';
                countryInput.value = userData.country;

                editModal.classList.remove('hidden');
            }

            // Função para esconder o modal de edição
            function hideEditModal() {
                editModal.classList.add('hidden');
            }

            // Função para alternar o tema da página
            function toggleTheme() {
                if (body.classList.contains('dark')) {
                    body.classList.remove('dark');
                    body.classList.add('light');
                    sunIcon.classList.remove('hidden');
                    moonIcon.classList.add('hidden');
                } else {
                    body.classList.remove('light');
                    body.classList.add('dark');
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                }
            }

            // --- Event Listeners ---
            
            // Alterna o tema
            themeToggle.addEventListener('click', toggleTheme);
            
            // Mostra o modal de edição ao clicar no botão "Editar Perfil"
            editButton.addEventListener('click', showEditModal);
            
            // Esconde o modal ao clicar em "Cancelar"
            cancelEditButton.addEventListener('click', hideEditModal);
            
            // Esconde o modal ao clicar fora dele
            editModal.addEventListener('click', (e) => {
                if (e.target.id === 'edit-modal') {
                    hideEditModal();
                }
            });

            // Lida com o envio do formulário de edição
            editForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Impede o recarregamento da página
                
                // Atualiza os dados do usuário com os valores do formulário
                userData.username = usernameInput.value;
                userData.handle = '@' + usernameInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
                userData.fullName = fullNameInput.value;
                userData.email = emailInput.value;
                userData.phone = phoneInput.value;
                const selectedGender = genderInput.value;
                if (selectedGender === 'male') {
                    userData.gender = 'Masculino';
                } else if (selectedGender === 'female') {
                    userData.gender = 'Feminino';
                } else {
                    userData.gender = 'Não informado';
                }
                userData.country = countryInput.value;

                // Atualiza a exibição do perfil na página principal
                updateProfileDisplay();
                
                // Esconde o modal
                hideEditModal();
            });

            // Lida com a pré-visualização da foto de perfil
            photoUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        modalProfilePhoto.src = e.target.result;
                        // Também atualiza a foto do perfil na página principal
                        profilePhoto.src = e.target.result; 
                        userData.photo = e.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            // Inicializa a exibição do perfil na página
            updateProfileDisplay();
