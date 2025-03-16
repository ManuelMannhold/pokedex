function renderChart(pokemonData) {
  const ctx = document.getElementById(`myChart`);

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['HP', 'Attack', 'Defense', 'Sp.Attack', 'Sp.Defense', 'Speed',],
    datasets: [{
      data: [Hp(pokemonData), attack(pokemonData), defense(pokemonData), speedAttack(pokemonData), speedDefense(pokemonData), speed(pokemonData)],
      borderWidth: 1,
      backgroundColor: 'green',
    }]
  },
  options: {
    scales: {
        x: {
            display: true,
        },
        y: {
            grid: {
                display: false,
            }
        }
    },
    aspectRatio: 0,
    indexAxis: 'y',
    plugins: {
        title: {
            display: true,
            text: 'POKEMON STATS',
        },
        legend: {
            display: false,
        },
    }
},
});
}

function Hp(pokemonData) {
let pokemonStats = pokemonData['stats'][0]['base_stat'];
  return pokemonStats;
}

function attack(pokemonData) {
let pokemonStats = pokemonData['stats'][1]['base_stat'];
  return pokemonStats;
}

function defense(pokemonData) {
let pokemonStats = pokemonData['stats'][2]['base_stat'];
  return pokemonStats;
}

function speedAttack(pokemonData) {
let pokemonStats = pokemonData['stats'][3]['base_stat'];
  return pokemonStats;
}

function speedDefense(pokemonData) {
let pokemonStats = pokemonData['stats'][4]['base_stat'];
  return pokemonStats;
}

function speed(pokemonData) {
let pokemonStats = pokemonData['stats'][5]['base_stat'];
  return pokemonStats;
}