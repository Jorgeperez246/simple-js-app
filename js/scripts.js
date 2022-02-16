// array of objects that have pokemon and their stats

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
    { name: "Fearow", height: 1.2, types: ["lying", "normal"] },
    { name: "Weedle", height: 0.3, types: ["bug", "poison"] },
  ];

  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    pokeList.appendChild(listItem);
    listItem.appendChild(button);
    button.classList.add("button-class");
    button.addEventListener("click", showDetails);
  }
  // this will show the details of the pokemon.
  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();
//loop to iterate over the objects

pokemonRepository.getAll().forEach((pokemon) => {
  pokemonRepository.addListItem(pokemon);
});

// testing git authorship with this comment
