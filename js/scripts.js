// array of objects that have pokemon and their stats

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }
  function add(pokemon) {
    if (typeof pokemon === "object" && "detailsUrl" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }
  function addListItem(pokemon) {
    let pokeList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("button");

    listItem.innerText = pokemon.name;
    pokeList.appendChild(listItem);

    listItem.classList.add(
      "list-group-item",
      "list-group-item-action",
      "text-center"
    );
    listItem.setAttribute("data-toggle", "modal");
    listItem.setAttribute("data-target", "#exampleModal");

    listItem.addEventListener("click", (event) => {
      showDetails(pokemon);
    });
  }
  // this will show the details of the pokemon.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon);
    });
  }
  function findPokemon(searchName) {
    $(".pokemon-list").empty();

    pokemonList.forEach((pokemon) => {
      if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())) {
        addListItem(pokemon);
      }
    });
  }
  function loadList() {
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        details.types.forEach(function (element) {
          item.types.push(element.type.name);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function showModal(item) {
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + item.name + "</h1>");
    let imageElement = document.createElement("img");
    imageElement.classList.add("modal-img");
    imageElement.src = item.imageUrl;
    let heightElement = $("<p>" + "height: " + item.height + "</p>");
    let typesElement = $("<p>" + "types: " + item.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    findPokemon: findPokemon,
  };
})();
//loop to iterate over the objects
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// testing git authorship with this comment
