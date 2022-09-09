async function fetchJsonData(){
    let url = 'https://dog.ceo/api/breeds/image/random';
    try{
        let resultFromPage = await fetch(url);
        return await resultFromPage.json();
    } catch(error){
        console.log(error);
    }
}

console.log(fetchJsonData());
