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
  function add(item) {
    pokemonList.push(item);
  }

  return {
    add: add,
    getAll: getAll,
  };
})();
//loop to iterate over the objects

pokemonRepository.getAll().forEach((item) => {
  if (item.height > 1.0) {
    document.write(
      `${item.name} (height: ${item.height}) - Wow, that's big! <br>`
    );
  } else {
    document.write(`${item.name} (height: ${item.height}) <br>`);
  }
});

// testing git authorship with this comment
