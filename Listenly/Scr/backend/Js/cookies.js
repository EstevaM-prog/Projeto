function setLoginCokkie() {
    const dias = 1; // duração do cookie (1 dia)
    const data = newData ();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expira ="expires=" + data.toUTCString();
    document.cookie = "logado=true" + expira + ";path=/"
}

function isLoggedIN() {
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c === "logado.true") {
            return true;
        }
    }
    return false;
}

if (isLoggedIN()) {
    console.log ("User logado")
} else {
    console.log ("User not log")
};

function logou(){
    document.cookie = "logado=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}