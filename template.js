function displayPokemonListTemplate(pokemonData) {
    return `
    <li class="pokedex-li" id="pokedex-pokemon-list" onclick="displayPokemonToOnclick(${pokemonData.id})">
        <div class="pokedex-li-header">
            <h2>${pokemonData.name}</h2>
            <span>#${pokemonData.id}</span>
        </div>
    </li>
`;
}

function displayPokemonToOnclickTemplate(pokemonData, pokemonId, cries) {
    return `
    <div class="show-pokemon-left-side">
    <div class="show-pokemon-header">
        <div class="show-pokemon-name">
            <span class="show-pokemon-name">${pokemonData.name} #${pokemonData.id}</span>
            <button onclick="playSound('${cries}')" class="play-button-sound"><img class="play-button-sound-image" src="./img/play-button.png"></img></button>
        </div>
        <div class="show-pokemon-info-and-image">
        <span class="pokemon-info">
            <img class="show-pokemon-image" src="${pokemonData.sprites.other.dream_world.front_default}"></img>
            <div id="types-background">${getPokemonType(pokemonData)}
        </div>
        </span>
            <div class="show-pokemon-characteristics">
            <span>Height: ${pokemonData.height}"</span>
            <span>Weight: ${pokemonData.weight}</span>
            </div>
            </div>
    </div>
        <div class="nav-buttons">
            <span><button class="button" id="show-stats" onclick="showStatsOnChart(${pokemonId})">Stats</button></span>
            <span><button class="button" onclick="getMovesOfPokemon(${pokemonId})">Moves</button></span>
        </div>
        </div>
    <div id="content-left-side">
    </div>            
    </div>
    `;
}

function getMovesTemplate(move) {
    return `
    <div class="pokemon-moves">
        <span class="pokemon-moves-detail">${move}</span>
    </div>
`;
}