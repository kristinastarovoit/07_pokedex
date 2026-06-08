function init() {
    fetchAllPokemon();
    fetchThisPokemonData();
}

const allData = [];
const allPokemon = [];

async function fetchAllPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
    const data = await response.json()
    allData.push(data);
    console.log(allData[0].results[0].name);
    console.log(data);
}

async function fetchThisPokemonData() {
    for (let i = 1; i <= 40; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const data = await response.json();
        allPokemon.push(data);
        renderPokemonImg(data);
        console.log(data);
    }
}

function renderPokemonImg(data) {
    const imgRef = document.getElementById('poke_img');
    imgRef.innerHTML += `<img src="${data.sprites.front_default}">`;
}



