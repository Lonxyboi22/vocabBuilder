const query = document.getElementById("#word");
var wordListEl = document.getElementById("myUL");
var spanishEl = document.getElementById("spanish");
//generates random word:
//var word = suggestedWords[Math.round(Math.random()*suggestedWords.length)];;

//this function uses the api to grab the dictionary definition of the word:
function definition(word){
    const dictionaryapi = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(dictionaryapi).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayWords(data[0].meanings[0].definitions[0]);
            });
         } else {
            alert("Error" + response.statusText);
        }
    })

}

//this function displays the english word under the button:
function displayWords(data){
    // console.log(data.definition);
    //document.getElementById("word-list").innerHTML = word + ": " + data.definition;

    var defList = document.createElement("li");
    defList.innerHTML = word + ": " + data.definition;
    console.log(defList);
    wordListEl.appendChild(defList);

    var spanList = document.createElement("li");
    spanList.innerHTML = word + "/" + spanishWord;
    spanishEl.appendChild(spanList);
}

// function getSpanish(<englishWors as string>)
// function requires an argument be passed to it
// function sets teh global variable "spanishWord" wqual to the first work in the
// 'shorddf' of the translation
apiKey='246175eb-f44c-41df-8446-5e18508e4805';
// englishWord= "bananas";
spanishWord = ""
var getSpanish = function (englishWord){
    var queryURL='https://www.dictionaryapi.com/api/v3/references/spanish/json/' + englishWord + '?key=' + apiKey;
    fetch(queryURL).then(response => response.json())
    .then(data => {
        // console.log(data[0].shortdef.toString());
        spanishWord = data[0].shortdef.toString().split(',')[0];
    });
}

var randomWord = function(){
    word = suggestedWords[Math.round(Math.random()*suggestedWords.length)];
};



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


// event listeners
document.getElementById("resetButton").addEventListener("click", clearStorage);

//runs the definition function and displayword function:
document.getElementById("get-word").addEventListener("click", function(){
    randomWord();
    storeWord(word);
    definition(word);
//     getSpanish(word);
  }) 
