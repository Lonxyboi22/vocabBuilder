const query = "lame";
// async function getTranslation(query){
//     function getTranslation(query){
//         const res = await fetch("https://libretranslate.com/translate", {
//             method: "POST",
//             body: JSON.stringify({
//                 q: query,
//                 source: "en",
//                 target: "es",
//                 format: "text"
//             }),
//             headers: { "Content-Type": "application/json" }
//         });
//         console.log(await res.json());
//     }
   
// // }
// getTranslation(query);

// https://api.dictionaryapi.dev/api/v2/entries/en/


function definition(){
    fetch('https://api.dictionaryapi.dev/api/v2/entries/en/'+ query)
    .then(response => response.json())
    .then(data => console.log(data));
}
