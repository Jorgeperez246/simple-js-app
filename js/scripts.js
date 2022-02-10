// array of objects that have pokemon and their stats
let pokemonList = [
  { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
  { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
  { name: "Fearow", height: 1.2, types: ["lying", "normal"] },
  { name: "Weedle", height: 0.3, types: ["bug", "poison"] },
];
//loop to iterate over the objects
for(let x = 0;x<pokemonList.length;x++){
  if(pokemonList[x].height>1.0){
  document.write(`${pokemonList[x].name} (height: ${pokemonList[x].height}) - Wow, that's big! <br>`);
}
 else {
  document.write(`${pokemonList[x].name} (height: ${pokemonList[x].height}) <br>`);
 }
}