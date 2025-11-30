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


const userId = localStorage.getItem("user_id");
const apiRoute = `http://localhost:5000/v1/users/${userId}`;

let userData = {
    phone: localStorage.getItem('phone') || '',
}

async function fetchUserData (){
    try {
        const response = await fetch(apiRoute, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        const data = await response.json()

        if(data) {
            await updateProfileDisplay(data)

            userData = {
                profile_pic: data.profile_pic.secure_url,
                username: data.nome || '',
                handle: data.handle || '',
                fullName: data.nome || '',
                email: data.email || '',
                phone: data.phone || '',
            }
        }

    } catch (error) {
        console.log(error)
    }
}
fetchUserData()


// --- Funções de Ação ---

// Função para atualizar os elementos da página com os dados do usuário
async function updateProfileDisplay(dados) {
    profilePhoto.src = localStorage.getItem('profile_pic') || '/Listenly/Scr/frontend/Pages/Img/Usuarios/default_profile.png';
    usernameDisplay.textContent = dados.nome || 'Usuário';
    handleDisplay.textContent = dados.handle || `@${dados.nome}${Math.floor(Math.random() * 1000)}`;
    fullNameDisplay.textContent = dados.nome || 'Nome Completo';
    emailDisplay.textContent = dados.email || ''
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
photoUploadInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Pré-visualização local
    const reader = new FileReader();
    reader.onload = (event) => {
        modalProfilePhoto.src = event.target.result;
        profilePhoto.src = event.target.result;
        userData.photo = event.target.result; // preview temporário
    };
    reader.readAsDataURL(file);

    // --- Upload no Cloudinary ---
    const cloudName = "dxhfucjft";
    const uploadPreset = "listenly_preset";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const apiRoute = `http://localhost:5000/v1/users/${userId}`;

    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        console.log(data)

        const res2 = await fetch(apiRoute, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('session_token')
            },
            body: JSON.stringify({ 
                profile_pic: {
                    secure_url: data.secure_url,
                    public_id: data.public_id
                }
            }),
        });

        localStorage.setItem('profile_pic', data.secure_url)

        if (data.secure_url) {
            // Atualiza a URL definitiva da foto
            modalProfilePhoto.src = data.secure_url;
            profilePhoto.src = data.secure_url;
            userData.photo = data.secure_url;
        }
    } catch (error) {
        console.error("Erro ao enviar imagem para Cloudinary:", error);
    }
});


// Inicializa a exibição do perfil na página
updateProfileDisplay();
