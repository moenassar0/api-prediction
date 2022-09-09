async function fetchJsonData(){
    let url = 'https://dog.ceo/api/breeds/image/random';
    try{
        let resultFromPage = await fetch(url);
        return await resultFromPage.json();
    } catch(error){
        console.log(error);
    }
}

async function renderURL() {
    let users = await fetchJsonData();
    let imageURL = users.message;
    console.log(imageURL);
    document.getElementById("dog-image").src = imageURL;
}

renderURL();
