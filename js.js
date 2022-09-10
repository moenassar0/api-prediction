//Fetching html docs
const the_name = document.getElementById("name");
const main_container = document.getElementById("container");
const second_container = document.getElementById("second-container");
const error_message = document.getElementById("error-message");
const gender_span = document.getElementById("gender-span");
const nation_span1 = document.getElementById("nation-span1");
const nation_span2 = document.getElementById("nation-span2");
const age_span = document.getElementById("age-span");

//Event listeners
document.getElementById("submit").addEventListener("click", submitButton);
document.getElementById("back").addEventListener("click", backButton);

//Refresh dog image
let refresh_icon = document.getElementById("refresh");
refresh_icon.addEventListener("click", refreshDogImage);

//General function to fetch json data from API
async function fetchJSONData(url){
    try{
        let resultFromPage = await fetch(url);
        return await resultFromPage.json();
    } catch(error){
        console.log(error);
    }
}

//Get the dog image URL and send it to the HTML element
async function renderDogImageURL(url) {
    let results = await fetchJSONData(url);
    let imageURL = results.message;
    document.getElementById("dog-image").src = imageURL;
}

async function renderGenderPrediction(url) {
    let results = await fetchJSONData(url);
    let genderResult = `${results.gender}`;
    return genderResult;
}

async function renderNationalityPrediction(url) {
    try{
        let results = await fetchJSONData(url);
        let countryPrediction = results.country;
        return countryPrediction;
    }
    catch(exception){
        console.log(exception);
    }
}

async function renderAgePrediction(url) {
    try{
        let results = await fetchJSONData(url);
        let agePrediction = `${results.age}`;
        return agePrediction;
    }
    catch(exception){
        console.log(exception);
    }
}

//Get dog image from URL
renderDogImageURL('https://dog.ceo/api/breeds/image/random');


//User submits his name
function submitButton(){
    let user_name = the_name.value;

    //Error message handling
    if(user_name == ''){
        error_message.classList.remove("hidden");
    }
    else{
        error_message.classList.add("hidden");
        main_container.classList.add("hidden");
        second_container.classList.remove("hidden");
        
        printGender(user_name);
        printNationality(user_name);
        printAge(user_name)
    }
}

//User goes back to the form to submit another name
function backButton(){
    main_container.classList.remove("hidden");
    second_container.classList.add("hidden");
}

function refreshDogImage(){
    renderDogImageURL('https://dog.ceo/api/breeds/image/random');
} 

//Get the gender prediction from the promise object
function printGender(user_name){
    url = "https://api.genderize.io/?name=" + user_name;
    renderGenderPrediction(url).then(data => {
        gender_span.innerHTML = "<b>Gender: </b> " + data
    });
}

//Get the nationallity prediction from the promise object
function printNationality(user_name){
    url = 'https://api.nationalize.io/?name=' + user_name;
    let nats = [];
    renderNationalityPrediction(url).then(data => {
        nats = data.map(obj => obj.country_id);
        
        //Check if nationality is returned or not
        if(nats[1] && nats[0]){
            nation_span1.innerHTML = "<b> Nationality 1: </b> " + nats[0];
            nation_span2.innerHTML = "<b> Nationality 2: </b> " + nats[1];
        }
        else if(nats[1]){
            nation_span1.innerHTML = "<b> Nationality 1: </b> not found";
            nation_span2.innerHTML = "<b> Nationality 2: </b> " + nats[1];
        }
        else if(nats[0]){
            nation_span1.innerHTML = "<b> Nationality 1: </b> " + nats[0];
            nation_span2.innerHTML = "<b> Nationality 2: </b> not found";
        }
        else{
            nation_span1.innerHTML = "<b> Nationality 1: </b> not found";
            nation_span2.innerHTML = "<b> Nationality 2: </b> not found";
        }
    })
}

//Get the age prediction from the promise object
function printAge(user_name){
    url = 'https://api.agify.io/?name=' + user_name;
    renderAgePrediction(url).then(data => {
        age_span.innerHTML = "<b> Age: </b> " + data;
    });
}



