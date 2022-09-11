document.getElementById("register").addEventListener("click", registerButton);
document.getElementById("login").addEventListener("click", loginButton);
const username_log = document.getElementById("username-login");
const password_log = document.getElementById("password-login");
const username_reg = document.getElementById("username-register");
const password_reg = document.getElementById("password-register");
const error_message_reg = document.getElementById("error-message-reg");
const error_message_log = document.getElementById("error-message-log");
error_message_reg.classList.add("hidden");

function registerButton(){
    console.log(username_reg.value);
    console.log(password_reg.value);

    var userinfo = {
        username: username_reg.value,
        password: password_reg.value,
    };
    
    var json = JSON.stringify(userinfo);
    localStorage.setItem(username_reg.value + " info", json);
    error_message_reg.classList.remove("hidden");
}

function loginButton(){
    //console.log(username_log.value);
    //console.log(password_log.value);

    let userinfo = localStorage.getItem(username_log.value + " info");
    //console.log(userinfo);
    let jsondata = JSON.parse(userinfo);
    
    if(userinfo == null){
        console.log("worng user");
        error_message_log.classList.remove("hidden");
    }
    else if(jsondata.username != username_log.value || jsondata.password != password_log.value){
        console.log("worng user");
        error_message_log.classList.remove("hidden");
    }
    else{
        location.href = './loggedIn.html';
        error_message_log.classList.add("hidden");
    }
}


