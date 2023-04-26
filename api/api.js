let pkName = '';

async function searchPk() {
    if (pkName) {
        const dataImg = await imgPk(pkName);
        const dataDesc = await descPk(pkName);
        return { name: pkName, img: dataImg.sprites.front_default, desc: dataDesc.flavor_text_entries[0].flavor_text }
    }
}

function imgPk(pkName) {
    var url = `https://pokeapi.co/api/v2/pokemon/${pkName.trim()}`;
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function descPk(pkName) {
    var url = `https://pokeapi.co/api/v2/pokemon-species/${pkName.trim()}`;
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function createLi() {
    searchPk().then((dataCard) => {
        var list = document.querySelector("ul");
        const newLi = document.createElement('li');
        newLi.innerHTML = 
        `
        <div class="card">
            <h5 class="card-header">${dataCard.name.toUpperCase()}</h5>
            <div class="card-body">
                <p class="card-text">${dataCard.desc}</p>
                <img class="imgPk" src="${dataCard.img}">
            </div>
        </div>
        `
        newLi.onclick = deleteLi;
        newLi.classList.add("col-3");
        newLi.classList.add("m-3");
        list.appendChild(newLi);
        hideBall();
    }).catch((error) => {
        console.error(error);
    });
}


function getPokemon() {
    const buttonAdd = document.getElementById("btnAdd");
    buttonAdd.addEventListener("click", function () {
        const inputName = document.getElementById("pkName")
        pkName = inputName.value.toLowerCase()
        inputName.value = ""
        createPokeball()
        const pokeball = document.querySelector(".pokeballContainer");
        initialTextHide();
        pokeball.classList.add("pokeballVisible");
    });
}

getPokemon();
initialTextHide();

function hideBall() {
    const pokeball = document.querySelector(".pokeballVisible");

    if (pokeball) {
        pokeball.remove();
    }
}

function initialTextHide() {
    const text = document.querySelector(".initialText");

    let listItems = Array.from(document.getElementsByTagName("li"));

    if (listItems.length) {
        text.classList.add("initialTextHide");
    }
    else {
        text.classList.remove("initialTextHide");
    }
}

function deleteLi(event) {
    const elLi = event.currentTarget.closest("li");
    elLi.remove();
    initialTextHide();
}

function createPokeball() {
    var list = document.querySelector("ul");
    const newLi = document.createElement('li');
    newLi.innerHTML = `
    <div class='pokeball' onclick='createLi()'>
        <img
            src="https://img.icons8.com/color/96/000000/pokeball-2.png">
    </div>
    `
    newLi.classList.add('pokeballContainer')
    newLi.classList.add('col-3')
    list.appendChild(newLi);
}