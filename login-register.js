document.getElementById("register").addEventListener("click", registerButton);
document.getElementById("login").addEventListener("click", loginButton);
const username_log = document.getElementById("username-login");
const password_log = document.getElementById("password-login");
const username_reg = document.getElementById("username-register");
const password_reg = document.getElementById("password-register");


function registerButton(){
    console.log(username_reg.value);
    console.log(password_reg.value);

    var userinfo = {
        username: username_reg.value,
        password: password_reg.value,
    };
    
    var json = JSON.stringify(userinfo);
    localStorage.setItem(username_reg.value + " info", json);
}

function loginButton(){
    console.log(username_log.value);
    console.log(password_log.value);

    let userinfo = localStorage.getItem(username_log.value + " info");
    console.log(userinfo);
    let jsoninfo = JSON.parse(userinfo);
    console.log(jsoninfo)
}


