document.getElementById("register").addEventListener("click", registerButton);

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

