const query = "lame";




function definition(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ query)
    .then(response => response.json())
    .then(data => console.log(data));
}


var randomWord = function(){
    return word = suggestedWords[Math.round(Math.random()*suggestedWords.length)];
};