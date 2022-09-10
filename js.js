//Fetching html docs
const main_container = document.getElementById("container");
const second_container = document.getElementById("second-container");
const error_message = document.getElementById("error-message");
const gender_span = document.getElementById("gender-span");
const nation_span1 = document.getElementById("nation-span1");
const nation_span2 = document.getElementById("nation-span2");

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
        //console.log(user_name);
        url = "https://api.genderize.io/?name=" + user_name;
        //console.log(renderGenderPrediction(url));
        renderGenderPrediction(url).then(data => {
            gender_span.innerHTML = "<b>Gender: </b> " + data
        });
        
    
        //nationality
        url2 = 'https://api.nationalize.io/?name=' + user_name;
        let nats = [];
        renderNationalityPrediction(url2).then(data => {
            nats = data.map(obj => obj.country_id);
            console.log(nats);
            //console.log(data[0].country_id);
            nation_span1.innerHTML = "<b> Nationality 1: </b> " + nats[0];
            nation_span2.innerHTML = "<b> Nationality 2: </b> " + nats[1];
        })
    }
}

//User goes back to the form to submit another name
function backButton(){
    main_container.classList.remove("hidden");
    second_container.classList.add("hidden");
}


