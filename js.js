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
    let results = await fetchJSONData(url);
    let imageURL = results.country[0];
    console.log(imageURL);
}

//Get dog image from URL
renderDogImageURL('https://dog.ceo/api/breeds/image/random');

//
let n = document.getElementById("submit").addEventListener("click", submitButton);

function submitButton(){
    let user_name = document.getElementById("name").value;
    console.log(user_name);
    url = "https://api.genderize.io/?name=" + user_name;
    console.log(url);
    renderGenderPrediction(url);

    //nationality
    url2 = 'https://api.nationalize.io/?name=' + user_name;
    console.log(url2);
    renderNationalityPrediction(url2);

}

/*url = "https://api.genderize.io/?name=" + n;
console.log(url);*/


