const query = document.getElementById("#word");

var wordListEl=document.getElementById("myUL");
var defE1 = document.getElementById("myDEF");
var spanishE1 = document.getElementById("mySPANISH");
var wordDef = {};
var theWord=document.getElementById("addToMyWords");

var wordTrinity = {
  word: "",
  def: "",
  spanish: ""
};

//generates random word:
//var word = suggestedWords[Math.round(Math.random()*suggestedWords.length)];

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
    });
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
// function to click '+' which adds to MyStoreWords array to print out on My Words
function addWordsStore(theWord){
    myStoredWords=[];
    document.getElementById("addToMyWords").addEventListener("click", function() {
    myStoredWords.push(word);
    console.log(myStoredWords);
  });
}

function displayWords(word){
   //console.log(data.definition);
  // document.getElementById("word-list").innerHTML = word + ": " + data.definition;

  var myWordLi = document.createElement("li");
  //myWordLi.setAttribute("id", "addToMyWords");
  const plusButtonId = "plusButtonWord" + wordListEl.childElementCount;
  myWordLi.innerHTML = "<i class='fa-solid fa-plus button is-small is-primary is-rounded' id='" + plusButtonId +"'></i>" + word + "<br>";
  myWordLi.setAttribute("id",word);
  wordListEl.appendChild(myWordLi);

  
  var defLi = document.createElement("li");
  var definition = "" + wordDef.definitions[0].definition;
  defLi.innerHTML = definition;
  defLi.setAttribute("id","d-"+word);
  defE1.appendChild(defLi);

  getSpanish(word);

  // function to click '+' which adds to MyStoreWords array to print out on My Words
  document.getElementById(plusButtonId).addEventListener("click", function() {
    wordTrinity.word = this.parentNode.textContent
    wordTrinity.def = document.getElementById("d-"+this.parentNode.textContent).textContent
    wordTrinity.spanish = document.getElementById("s-"+this.parentNode.textContent).textContent

    storeWord(wordTrinity, "myWords");
  });

}

// function getSpanish(<englishWors as string>)
// function requires an argument be passed to it
// function sets teh global variable "spanishWord" wqual to the first work in the
// 'shorddf' of the translation
// englishWord= "bananas";
var getSpanish = function (englishWord){
    apiKey='246175eb-f44c-41df-8446-5e18508e4805';

    var queryURL='https://www.dictionaryapi.com/api/v3/references/spanish/json/' + englishWord + '?key=' + apiKey;
    
    fetch(queryURL).then(function(response){
        if(response.ok){
            response.json().then(function(data){
              console.log(data);
                const spanishLi = document.createElement("li");
                let spanishWord = '';
                if (data[0].shortdef) {
                  spanishWord = data[0].shortdef.toString().split(',')[0];
                } else {
                  spanishWord = data[0];
                }
                spanishLi.innerHTML = spanishWord;
                spanishLi.setAttribute("id","s-"+englishWord);
                spanishE1.appendChild(spanishLi);
            });
        } else {
           alert(englishWord, "is missing");
           wordIsMissing = true;
        }
    })
}


 var randomWord = function(){
   return suggestedWords[Math.round(Math.random()*suggestedWords.length)];
 };


// Function for saving words to local storage
function storeWord(wordTrinity, key) {

  var myWords = JSON.parse(localStorage.getItem(key));
  if (myWords === null ) {
    myWords=[];
    myWords.push(wordTrinity);
  } else {
    myWords.push(wordTrinity);
  }
  localStorage.setItem(key, JSON.stringify(myWords));
}

// Function for clearing storage
function clearStorage(){ 
  localStorage.clear()
}

// Returns last word that was saved in local storage
function getLastWord(key) {
  let data = localStorage.getItem(key);
  if (data === null) {
    return null;
  } 
  data = JSON.parse(data);
  return data[data.length - 1];
}

// *** dont think this is needed here - moved to my-words.js ***
function getAllWords(key) {
  let data = localStorage.getItem(key);
  if (data === null) {
    return [];
  }
  data = JSON.parse(data);
  return data;
}

// var wordClick = function (event) {
//     event.preventDefault();
//     console.log("you gotta click...");
// };

// event listeners
document.getElementById("resetButton").addEventListener("click", function() {
  clearStorage();
  window.location.reload();
});

//runs the definition function and displayword function:
document.getElementById("get-word").addEventListener("click", function(){
  const word = randomWord();
  // storeWord(word, "words");
  definition(word);
});

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


// wordListEl.addEventListener("click", wordClick); 
//wordListEl.addEventListener("click", wordClick); 
