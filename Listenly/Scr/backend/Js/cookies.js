    // Cria um cookie
    function setCookie(username, value, days) {
        const encodedValue = encodeURIComponent(value);
        let expires = "";
        if (days) {
            const d = new Date();
            d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + d.toUTCString();
        }
        // path=/ para ficar disponível em todo o site; SameSite=Lax recomendado por padrão
        document.cookie = `${username}=${encodedValue}${expires}; path=/; SameSite=Lax`;
        }

    // Lê um cookie pelo nome
    function getCookie(username) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let c of cookies) {
            c = c.trim();
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
        }
        return null;
        }

    // Apaga um cookie
    function eraseCookie(username) {
        // define com data de expiração passada
        document.cookie = `${username}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        }

        