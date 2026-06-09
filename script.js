function init() {
    fetchThisPokemonData();
}

const allPokemon = [];

// async function fetchAllPokemon() {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
//     const data = await response.json()
//     allData.push(data);
//     console.log(allData[0].results[0].name);
// }

async function fetchThisPokemonData() {
    for (let i = 1; i <= 40; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const data = await response.json();
        allPokemon.push(data);
    }
    renderPokemonCards();
}

function renderPokemonCards() {
    const pokemonRef = document.getElementById('pokedex_content');
    pokemonRef.innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        pokemonRef.innerHTML +=
        getPokemonCardsTemplate(i);
        renderPokemonType(i);
    }
}

function renderPokemonType(i) {
    const typeRef = document.getElementById(`pkm_type_${i}`);
    typeRef.innerHTML = '';
    for (let indexType = 0; indexType < allPokemon[i].types.length; indexType++) {
        typeRef.innerHTML += `<p>${allPokemon[i].types[indexType].type.name}`
    }
}

function getPokemonCardsTemplate(i) {
    return `            
            <div class="pkm_content_card">
                <p class="pkm_name">${allPokemon[i].name}</p>
                <p class="pkm_number"># ${allPokemon[i].id}</p>
                <img class="pkm_img" src="${allPokemon[i].sprites.front_default}">
                <div class="pkm_type" id="pkm_type_${i}"></div>
                <button onclick="renderDialog(${i})">more info</button>
            </div>`
}
