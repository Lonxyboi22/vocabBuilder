

document.getElementById("get-word").addEventListener("click", function () {
  const word = randomWord();
  definition(word);
});

function definition(word) {
  const dictionaryapi = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
  fetch(dictionaryapi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let wordDef = JSON.stringify(data[0].meanings[0]);
        let spanish = getSpanish(word);
        console.table({word:word,def:wordDef,spanish:spanish})
        document.getElementById('wordsDiv').innerHTML += 
        `<div class="row">
            <div class="col1">
              <h2>${word}</h2>
            </div>
            <div class="col2">
              <p>${wordDef}</p>
            </div>
            <div class="col3">
              <h2>${spanish}</h2>
            <div>
          </div>`
      });
    }
  })
}


var getSpanish = function (englishWord) {
    apiKey = '246175eb-f44c-41df-8446-5e18508e4805';
    var queryURL = 'https://www.dictionaryapi.com/api/v3/references/spanish/json/' + englishWord + '?key=' + apiKey;
    fetch(queryURL).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          let spanishWord = '';
          if (data[0].shortdef) {
            spanishWord = data[0].shortdef.toString().split(',')[0];
          } else {
            spanishWord = data[0];
          };
          return spanishWord;
        });
      }
    })
  }


  var randomWord = function () {
    return suggestedWords[Math.round(Math.random() * suggestedWords.length)];
  };


  document.getElementById("resetButton").addEventListener("click", function () {
    clearStorage();
    window.location.reload();
  });


