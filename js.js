//Fetching divs
const main_container = document.getElementById("container");
const second_container = document.getElementById("second-container");
const error_message = document.getElementById("error-message");

//Event listeners
document.getElementById("submit").addEventListener("click", submitButton);
document.getElementById("back").addEventListener("click", backButton);

//Refresh dog image
let refresh_icon = document.getElementById("refresh");
refresh_icon.addEventListener("click", refreshDogImage);

function refreshDogImage(){
    console.log("gg");
    renderDogImageURL('https://dog.ceo/api/breeds/image/random');
} 

async function fetchJSONData(url){
    try{
        let resultFromPage = await fetch(url);
        return await resultFromPage.json();
    } catch(error){
        console.log(error);
    }
}

async function renderDogImageURL(url) {
    let results = await fetchJSONData(url);
    let imageURL = results.message;
    console.log(imageURL);
    document.getElementById("dog-image").src = imageURL;
}

async function renderGenderPrediction(url) {
    let results = await fetchJSONData(url);
    let imageURL = results.gender;
    console.log(imageURL);
}

async function renderNationalityPrediction(url) {
    try{
        let results = await fetchJSONData(url);
        let imageURL = results.country[0].country_id;
        console.log(imageURL);
        imageURL = results.country[1].country_id;
        console.log(imageURL);
        imageURL = results.country[2].country_id;
        console.log(imageURL);
    }
    catch(exception){
        console.log(exception);
    }
}

//Get dog image from URL
renderDogImageURL('https://dog.ceo/api/breeds/image/random');




//User submits his name
function submitButton(){
    let user_name = document.getElementById("name").value;
    let exclamation_circle = document.getElementById("exclamation-circle");
    //main_container.classList.add("hidden");
    //Error message handling
    if(user_name == ''){
        error_message.classList.remove("hidden");
    }
    else{
        error_message.classList.add("hidden");
        main_container.classList.add("hidden");
        second_container.classList.remove("hidden");
        console.log(user_name);
        url = "https://api.genderize.io/?name=" + user_name;
        console.log(url);
        renderGenderPrediction(url);
    
        //nationality
        url2 = 'https://api.nationalize.io/?name=' + user_name;
        console.log(url2);
        renderNationalityPrediction(url2);
    }
}

//User goes back to the form to submit another name
function backButton(){
    main_container.classList.remove("hidden");
    second_container.classList.add("hidden");
}

/*url = "https://api.genderize.io/?name=" + n;
console.log(url);*/


