function init() {
    fetchThisPokemonData(1, 40, 0);
}

const allPokemon = [];
const pokemonRef = document.getElementById('pokedex_content');
const searchButton = document.getElementById('search_button');
const showMoreButton = document.getElementById('show_more_button');
let morePokemonLoaded = false;


async function fetchThisPokemonData(startvaluePkmId, endvaluePkmId, startvaluePkmIndex) {
    try {
        showLoadingScreen();
        for (let i = startvaluePkmId; i <= endvaluePkmId; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            const data = await response.json();
            allPokemon.push(data);
        }
        removeLoadingScreen();
        renderPokemonCards(startvaluePkmIndex);
    }
    catch (error) {
        console.error('Loading error:', error);
        removeLoadingScreen();
    }
}

function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading_screen');
    loadingScreen.classList.remove('d_none');
    pokemonRef.style.display = 'none';
    searchButton.disabled = true;
    removeShowMoreButton();
}

function removeLoadingScreen() {
    const loadingScreen = document.getElementById('loading_screen');
    loadingScreen.classList.add('d_none');
    pokemonRef.style.display = 'flex';
    searchButton.disabled = false;
}

function renderPokemonCards(startvaluePkmIndex) {
    for (let i = startvaluePkmIndex; i < allPokemon.length; i++) {
        pokemonRef.innerHTML += getPokemonCardsTemplate(i);
        renderPokemonType(i);
    }
    if (!morePokemonLoaded) {
        showShowMoreButton();
    }
}

function renderPokemonType(i) {
    const typeRef = document.getElementById(`pkm_type_${i}`);
    typeRef.innerHTML = '';
    for (let indexType = 0; indexType < allPokemon[i].types.length; indexType++) {
        typeRef.innerHTML += `<p class="${allPokemon[i].types[indexType].type.name}">${allPokemon[i].types[indexType].type.name}`
    }
}

function getPokemonCardsTemplate(i) {
    return `            
            <div class="pkm_content_card">
                <p class="pkm_name">${allPokemon[i].name}</p>
                <p class="pkm_number"># ${allPokemon[i].id}</p>
                <img class="pkm_img" src="${allPokemon[i].sprites.front_default}">
                <div class="pkm_type" id="pkm_type_${i}"></div>
                <button id="more_info_button_${i}" class="more_info_button" onclick="renderDialog(${i})">more info</button>
            </div>`
}

function renderDialog(i) {
    openDialog();
    renderPokemonCardInDialog(i);
    removeInfoButtonInDialog(i);
    renderDialogButtons(i);
    renderAboutSection(i);
    renderDialogArrows(i);
}

function renderPokemonCardInDialog(i) {
    const dialogCardRef = document.getElementById('standard_card');
    dialogCardRef.innerHTML = '';
    dialogCardRef.innerHTML += getPokemonCardsTemplate(i);
    renderPokemonType(i);
}

function removeInfoButtonInDialog(i) {
    const infoButton = document.getElementById(`more_info_button_${i}`);
    infoButton.classList.add('d_none');
}

function openDialog() {
    const dialogRef = document.getElementById('dialog_popup');
    dialogRef.showModal();
    dialogRef.classList.add('opened');
    document.body.style.overflow = 'hidden';
}

function closeDialog() {
    const dialogRef = document.getElementById('dialog_popup');
    dialogRef.close();
    dialogRef.classList.remove('opened');
    document.body.style.overflow = '';
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
        aboutValueRef.innerHTML += `<li>${allPokemon[i].abilities[indexAbout].ability.name}</li>`
    }
}

function renderStatsSection(i) {
    const infoSectionRef = document.getElementById('info_section');
    infoSectionRef.innerHTML = '';
    infoSectionRef.innerHTML += getStatsSectionTemplate();
    renderPokemonStats(i);
}

function renderPokemonStats(i) {
    const statsRef = document.getElementById('stats_table_body');
    statsRef.innerHTML = '';
    for (let indexStat = 0; indexStat < allPokemon[i].stats.length; indexStat++) {
        statsRef.innerHTML += getPokemonStatsTemplate(i, indexStat);
    }
}

function getPokemonStatsTemplate(i, indexStat) {
    return `
            <tr>
                <th>${allPokemon[i].stats[indexStat].stat.name}</th>
                <td><progress value="${allPokemon[i].stats[indexStat].base_stat}" max="255"></progress></td>
            </tr>`
}

function getDialogButtonsTemplate(i) {
    return `
            <button onclick="renderAboutSection(${i})">about</button>
            <button onclick="renderStatsSection(${i})">stats</button>`
}

function getAboutSectionTemplate(i) {
    return `                
            <table class="about_section">
                <tbody>
                    <tr>
                        <th>weight</th>
                        <td>${allPokemon[i].weight} hg</td>
                    </tr>
                    <tr>
                        <th>height</th>
                        <td>${allPokemon[i].height} dm</td>
                    </tr>
                    <tr>
                        <th>base xp</th>
                        <td>${allPokemon[i].base_experience}</td>
                    </tr>
                    <tr>
                        <th class="th_abilities">abilities</th>
                        <td id="abilities"></td>
                    </tr>
                </tbody>
            </table>`
}

function getStatsSectionTemplate() {
    return `   
            <table class="stats_section">
                <tbody id="stats_table_body"></tbody>
            </table>`
}

async function fetchMorePokemon() {
    morePokemonLoaded = true;
    fetchThisPokemonData(41, 80, 40);
    removeShowMoreButton();
}

function removeShowMoreButton() {
    showMoreButton.classList.add('d_none');
}

function showShowMoreButton() {
    showMoreButton.classList.remove('d_none');
}

function renderDialogArrows(i) {
    const arrowRef = document.getElementById('dialog_arrows');
    arrowRef.innerHTML = '';
    arrowRef.innerHTML = /*html*/ `                    
            <button onclick="showPrevPokemon(${i})"><img class="dialog_arrow_left dialog_arrow" src="assets/img/arrow.svg" alt="Pfeil links"></button>
            <button onclick="showNextPokemon(${i})"><img class="dialog_arrow_right dialog_arrow" src="assets/img/arrow.svg" alt="Pfeil rechts"></button>`
}

function showNextPokemon(i) {
    let nextPokemonIndex = i + 1;
    if (nextPokemonIndex >= allPokemon.length) {
        nextPokemonIndex = 0;
    }
    renderDialog(nextPokemonIndex);
}

function showPrevPokemon(i) {
    let prevPokemonIndex = i - 1;
    if (prevPokemonIndex < 0) {
        prevPokemonIndex = allPokemon.length - 1;
    }
    renderDialog(prevPokemonIndex);
}

function searchForPokemon() {
    const searchInput = document.getElementById('pokemon_search').value.toLowerCase();
    const searchErrorRef = document.getElementById('search_error');
    const pokemonSearchName = allPokemon.filter(pokemon => pokemon.name.includes(searchInput));
    if (searchInput.length < 3) {
        searchErrorRef.classList.remove('d_none');
    }
    else if (pokemonSearchName.length == 0) {
        console.log('nothing found');
        pokemonRef.innerHTML = '';
    }
    else {
        searchErrorRef.classList.add('d_none');
        renderSearchSection(pokemonSearchName);
    }
}

function clearSearchInput() {
    document.getElementById('pokemon_search').value = '';
}

function renderSearchedPokemonCard(pokemonSearchName) {
    pokemonRef.innerHTML = '';
    for (let i = 0; i < pokemonSearchName.length; i++) {
        const searchIndex = allPokemon.indexOf(pokemonSearchName[i]);
        pokemonRef.innerHTML += getPokemonCardsTemplate(searchIndex);
        renderPokemonType(searchIndex);
    }
}

function renderSearchSection(pokemonSearchName) {
    renderSearchedPokemonCard(pokemonSearchName);
    clearSearchInput();
    removeShowMoreButton();
}

