const query = "fruit";


function definition(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ query)
    .then(response => response.json())
    .then(data => console.log(data));
}
definition();

function language(){
    fetch('https://www.dictionaryapi.com/api/v3/references/spanish/json/language?key=https://dictionaryapi.com/account/example?key=246175eb-f44c-41df-8446-5e18508e4805')
    .then(response => response.json())
    .then(data => console.log(data));
}

var randomWord = function(){
    return suggestedWords[Math.round(Math.random()*suggestedWords.length)];
};

language();