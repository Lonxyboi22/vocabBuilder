var wordListEl=document.getElementById("myUL");
var defEl = document.getElementById("myDEF");
var spanishEl = document.getElementById("mySPANISH");



// Function for clearing storage
function clearStorage(){ 
  localStorage.clear()
}

function getAllWords(key) {
  var myWords = JSON.parse(localStorage.getItem(key));
  if (myWords === null) {
    myWords = [];
  }
return myWords;
}

var displayMyWords = function (){
  for(i in myWords){
    // display the word
    var myWordLi = document.createElement("li");
    myWordLi.innerHTML = myWords[i].word;
    wordListEl.appendChild(myWordLi);

    var myDefLi = document.createElement("li");
    myDefLi.innerHTML = myWords[i].def;
    defEl.appendChild(myDefLi);

    var mySpanishLi = document.createElement("li");
    mySpanishLi.innerHTML = myWords[i].spanish;
    spanishEl.appendChild(mySpanishLi);
  };
};

var myWords = getAllWords("myWords");
displayMyWords();

// event listener
document.getElementById("resetButton").addEventListener("click", function() {
  clearStorage();
  window.location.reload();
});