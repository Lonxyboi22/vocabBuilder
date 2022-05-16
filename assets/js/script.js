const query = document.getElementById("#word");
const wordSubmit = document.getElementById("#btn-submit")

function definition(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ query)
    .then(response => response.json())
    .then(data => console.log(data));
}
definition();

apiKey='246175eb-f44c-41df-8446-5e18508e4805';
spanishWord= "bananas";
function language(spanish){
    var queryURL='https://www.dictionaryapi.com/api/v3/references/spanish/json/' + spanishWord + '?key=' + apiKey;
    fetch(queryURL).then(response => response.json())
    .then(data => console.log(data));
}
language();

// Function for saving words to local storage
function storeWord(word) {
  let data = localStorage.getItem("words");
  if (data === null ) {
    data = [word];
  } else {
    data = JSON.parse(data);
    data.push(word);
  }
  localStorage.setItem("words", JSON.stringify(data));
}

// Function for clearing storage
function clearStorage(){ 
  localStorage.clear()
}

// Returns last word that was saved in local storage
function getLastWord() {
  let data = localStorage.getItem("words");
  if (data === null) {
    return null;
  } 
  data = JSON.parse(data);
  return data[data.length - 1];
}

document.getElementById("resetButton").addEventListener("click", clearStorage);
