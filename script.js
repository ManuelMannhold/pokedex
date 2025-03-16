let currentNames = [];
let pokedex;
let pokemonData;
let pokemonTypes;
let limit = 20;
let offset = 0;
let allPokemons = [];

async function init() {
  await fetchData();
  await allPokemon();
}

async function fetchData() {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();

  displayPokemonList(data.results);
}

async function allPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0`;
  let response = await fetch(url);
  data = await response.json();

  for (let k = 0; k < data.results.length; k++) {
    let pokemons = data.results[k].name;

    allPokemons.push(pokemons);
  }
}

async function displayPokemonList(pokemonList) {
  let container = document.getElementById("right-side");

  for (let i = 0; i < pokemonList.length; i++) {
    const data = pokemonList[i];
    const response = await fetch(data.url);
    pokemonData = await response.json();
    currentNames.push(pokemonData.name);
    pokemonTypes = pokemonData.types;

    container.innerHTML += displayPokemonListTemplate(pokemonData, i);
  }
}

async function displayPokemonToOnclick(pokemonId) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let pokemonData = await response.json();
  let container = document.getElementById("left-side");
  let cries = pokemonData.cries.latest;

  container.innerHTML = displayPokemonToOnclickTemplate(
    pokemonData,
    pokemonId,
    cries
  );
}

function playSound(soundURL) {
  let AUDIO = new Audio(soundURL);
  AUDIO.play();
}

async function showStatsOnChart(pokemonId) {
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let pokemonData = await response.json();
  let container = document.getElementById("content-left-side");
  container.style.overflowY = "visible";

  container.innerHTML = `
      <canvas id="myChart"></canvas>
    `;
  renderChart(pokemonData);
}

function getPokemonType(pokemonData) {
  pokemonTypes = pokemonData.types;
  let pokeTypes = "";

  if (pokemonTypes && pokemonTypes.length > 0) {
    for (let j = 0; j < pokemonTypes.length; j++) {
      const types = pokemonTypes[j].type.name;

      pokeTypes += `
                    <span class="show-pokemon-types ${types}">${types}</span>
                `;
    }
  }
  return pokeTypes;
}

function load20MorePokemon() {
  let loader = document.getElementById("dialog");
  loader.classList.remove("d-none");
  offset += limit;

  setTimeout(function () {
    loader.classList.add("d-none");
  }, 2000);

  fetchData(offset, limit);
}

function searchPokemon() {
  let search = document.getElementById("search").value.toLowerCase();
  let pokemons = document.getElementsByClassName("pokedex-li");

  for (let i = 0; i < pokemons.length; i++) {
    let pokemonName = pokemons[i].querySelector("h2").textContent.toLowerCase();

    if (pokemonName.includes(search)) {
      pokemons[i].style.display = "flex";
    } else {
      pokemons[i].style.display = "none";
    }
  }
}

async function loadAllPokemon() {
  let loader = document.getElementById("dialog");

  if (
    window.confirm(
      `Really Load all Pokemons?It Takes a Minute to Load all ${allPokemons.length} Pokemon`
    )
  ) {
    offset = 20;
    limit += 1302;
    limit += offset;

    if (offset < limit) {
      document.getElementById("dialog").classList.remove("d-none");
    }
    setTimeout(function () {
      loader.classList.add("d-none");
    }, 60000);
    await fetchData(offset, limit);
  }
}

async function getMovesOfPokemon(pokemonId) {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
  let response = await fetch(url);
  let pokemonData = await response.json();
  let content = document.getElementById("content-left-side");
  let chart = document.getElementById("myChart");
  content.style.overflowY = "auto";

  getMovesChartNull(chart, content, pokemonData);
  getMovesChartNotNull(chart, content, pokemonData);
}

function getMovesChartNull(chart, content, pokemonData) {
  if (chart == null) {
    for (let j = 0; j < pokemonData.moves.length; j++) {
      let move = pokemonData.moves[j].move.name;

      content.innerHTML += `
                <div class="pokemon-moves">
                    <span class="pokemon-moves-detail">${move}</span>
                </div>
            `;
    }
  } else {
    chart.classList.add("d-none");
  }
}

function getMovesChartNotNull(chart, content, pokemonData) {
  if (chart !== null) {
    for (let j = 0; j < pokemonData.moves.length; j++) {
      let move = pokemonData.moves[j].move.name;

      content.innerHTML += `
                <div class="pokemon-moves">
                    <span class="pokemon-moves-detail">${move}</span>
                </div>
            `;
    }
  }
}

function loadingSpinner() {
  let loader = document.getElementById("loader");

  loader.remove("d-none");
}
