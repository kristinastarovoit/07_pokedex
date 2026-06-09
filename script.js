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
                <button id="more_info_button_${i}" onclick="renderDialog(${i})">more info</button>
            </div>`
}

function renderDialog(i) {
    openDialog();
    renderPokemonCardInDialog(i);
    removeInfoButtonInDialog(i);
    renderDialogButtons(i);
    renderAboutSection(i);
}

function renderPokemonCardInDialog(i) {
    const dialogCardRef = document.getElementById('standard_card');
    dialogCardRef.innerHTML = '';
    dialogCardRef.innerHTML += getPokemonCardsTemplate(i);
}

function removeInfoButtonInDialog(i) {
    const infoButton = document.getElementById(`more_info_button_${i}`);
    infoButton.classList.add('d_none');
}

function openDialog() {
    const dialogRef = document.getElementById('dialog_popup');
    dialogRef.showModal();
}

function closeDialog() {
    const dialogRef = document.getElementById('dialog_popup');
    dialogRef.close();
}

function renderDialogButtons(i) {
    const dialogButtonsRef = document.getElementById('dialog_info_button');
    dialogButtonsRef.innerHTML = '';
    dialogButtonsRef.innerHTML += getDialogButtonsTemplate(i);
}

function renderAboutSection(i) {
    const aboutSectionRef = document.getElementById('info_section');
    aboutSectionRef.innerHTML = '';
    aboutSectionRef.innerHTML += getAboutSectionTemplate(i);
    renderAbilitySection(i);
}

function renderAbilitySection(i) {
    const aboutValueRef = document.getElementById('abilities');
    aboutValueRef.innerHTML = '';
    for (let indexAbout = 0; indexAbout < allPokemon[i].abilities.length; indexAbout++) {
        aboutValueRef.innerHTML += `<p>${allPokemon[i].abilities[indexAbout].ability.name}</p>`
    }
}

function renderStatsSection(i) {
    const aboutSectionRef = document.getElementById('info_section');
    aboutSectionRef.innerHTML = '';
    aboutSectionRef.innerHTML += getStatsSectionTemplate();
    renderPokemonStats(i);
}

function renderPokemonStats(i) {
    const statsKeyRef = document.getElementById('stats_key_section');
    const statsValueRef = document.getElementById('stats_value_section');
    statsKeyRef.innerHTML = '';
    statsValueRef.innerHTML = '';
    for (let indexStat = 0; indexStat < allPokemon[i].stats.length; indexStat++) {
        statsKeyRef.innerHTML += `<p>${allPokemon[i].stats[indexStat].stat.name}</p>`
        statsValueRef.innerHTML += `<p>${allPokemon[i].stats[indexStat].base_stat}</p>`
    }
}

function getDialogButtonsTemplate(i) {
    return `
            <button onclick="renderAboutSection(${i})">about</button>
            <button onclick="renderStatsSection(${i})">stats</button>`
}

function getAboutSectionTemplate(i) {
    return `                
            <div class="about_section">
                <div id="about_key_section">
                    <p class="about_key">weight</p>
                    <p class="about_key">height</p>
                    <p class="about_key">base xp</p>
                    <p class="about_key">abilities</p>
                </div>
                <div id="about_value_section">
                    <p class="about_value">${allPokemon[i].weight} hg</p>
                    <p class="about_value">${allPokemon[i].height} dm</p>
                    <p class="about_value">${allPokemon[i].base_experience}</p>
                    <div class="about_value" id="abilities"></div>
                </div>
            </div>`
}

function getStatsSectionTemplate() {
    return`   
            <div class="stats_section">
                <div id="stats_key_section"></div>
                <div id="stats_value_section"></div>
            </div>` 
}



