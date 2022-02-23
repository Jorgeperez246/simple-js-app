// array of objects that have pokemon and their stats

let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
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
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    pokeList.appendChild(listItem);
    listItem.appendChild(button);
    button.classList.add("button-class");
    button.addEventListener("click", (event) => {
      showDetails(pokemon);
    });
  }
  // this will show the details of the pokemon.
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
      showModal(pokemon.name, `Height: ${pokemon.height}`, pokemon.imageUrl);
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
        item.types = details.types;
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function showModal(title, text, img) {
    modalContainer.innerHTML = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    let imgElement = document.createElement("img");
    imgElement.src = img;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }
  function hideModal() {
    modalContainer.classList.remove("is-visible");
  }
  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  function validateEmail() {
    let value = email.value;

    if (!value) {
      showErrorMessage(email, "Email is a required field.");
      return false;
    }

    if (value.indexOf("@") === -1) {
      showErrorMessage(email, "You must enter a valid email address.");
      return false;
    }

    showErrorMessage(email, null);
    return true;
  }
  function validatePassword() {
    let value = password.value;

    if (!value) {
      showErrorMessage(password, "Password is a required field.");
      return false;
    }

    if (value.length < 8) {
      showErrorMessage(
        password,
        "The password needs to be at least 8 characters long."
      );
      return false;
    }

    showErrorMessage(password, null);
    return true;
  }
  function showErrorMessage(input, message) {
    let container = input.parentElement;

    let error = container.querySelector(".error-message");
    if (error) {
      container.removeChild(error);
    }

    if (message) {
      let error = document.createElement("div");
      error.classList.add("error-message");
      error.innerText = message;
      container.appendChild(error);
    }
  }
  function validateForm() {
    let isValidEmail = validateEmail();
    let isValidPassword = validatePassword();
    return isValidEmail && isValidPassword;
  }
  email.addEventListener("input", validateEmail);
  password.addEventListener("input", validatePassword);
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    showErrorMessage: showErrorMessage,
    validateEmail: validateEmail,
    validatePassword: validatePassword,
    validateForm: validateForm,
  };
})();
//loop to iterate over the objects
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

// testing git authorship with this comment
