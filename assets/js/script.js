const query = document.getElementById("#word");

var wordListEl=document.getElementById("myUL");
var defE1 = document.getElementById("myDEF");
var spanishE1 = document.getElementById("mySPANISH");
var wordDef = {};

//generates random word:
//var word = suggestedWords[Math.round(Math.random()*suggestedWords.length)];
var word="";

//this function uses the api to grab the dictionary definition of the word:
function definition(word){
    const dictionaryapi = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    fetch(dictionaryapi).then(function(response){
        if(response.ok){
            response.json().then(function(data){
               // displayWords(data[0].meanings[0].definitions[0]);
               wordDef = data[0].meanings[0];

               displayWords(word);
            });
         } else {
            alert("Error" + response.statusText);
        }
    })

}

//this function displays the english word under the button:
//I JUST COMMENTED IT OUT SO CODE DIDNT BREAK, BUT WE CAN ADD THIS BACK IN :)
// function displayWords(word){
//     // console.log(data.definition);
//     //document.getElementById("word-list").innerHTML = word + ": " + data.definition;

//     var defList = document.createElement("li");
//     defList.innerHTML = word + ": " + data.definition;
//     console.log(defList);
//     wordListEl.appendChild(defList);

//     var spanList = document.createElement("li");
//     spanList.innerHTML = word + "/" + spanishWord;
//     spanishEl.appendChild(spanList);

// function displayWords(data){
//     // console.log(data.definition);
//     document.getElementById("word-list").innerHTML = word + ": " + data.definition;
// }

function displayWords(word){
   //console.log(data.definition);
  // document.getElementById("word-list").innerHTML = word + ": " + data.definition;

  var myWordLi = document.createElement("li");
  myWordLi.innerHTML = "<i class='fa-solid fa-plus button is-small is-primary is-rounded' id='store-word'></i>" + word + "<br>";
  wordListEl.appendChild(myWordLi);
  
  var defLi = document.createElement("li");
  var definition = "" + wordDef.definitions[0].definition;
  defLi.innerHTML = definition;
  defE1.appendChild(defLi);

  var spanishLi = document.createElement("li");
  spanishLi.innerHTML = spanishWord;
  spanishE1.appendChild(spanishLi);

}

// function getSpanish(<englishWors as string>)
// function requires an argument be passed to it
// function sets teh global variable "spanishWord" wqual to the first work in the
// 'shorddf' of the translation
// englishWord= "bananas";
spanishWord = ""
var getSpanish = function (englishWord){
    apiKey='246175eb-f44c-41df-8446-5e18508e4805';

    var queryURL='https://www.dictionaryapi.com/api/v3/references/spanish/json/' + englishWord + '?key=' + apiKey;
    fetch(queryURL).then(response => response.json())
    .then(data => {
         console.log(data[0].shortdef.toString());
        spanishWord = "" + data[0].shortdef.toString().split(',')[0];
        
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
document.getElementById("resetButton").addEventListener("click", function() {
  clearStorage();
  window.location.reload();
});


//runs the definition function and displayword function:
document.getElementById("get-word").addEventListener("click", function(){
  randomWord();
  storeWord(word);
  definition(word);
  getSpanish(word);
  }) 

  document.getElementById("my-words").addEventListener("click", function(){
    window.location = "./mywords.html";
  })

  //Back button is broken.
  document.getElementById("go-back").addEventListener("click", function(){
    window.location = "./index.html";
  })

  //storeWord button broken.
  document.getElementById("store-word").addEventListener("click", function(){
    window.location= "./mywords.html";
  })