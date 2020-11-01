const buscar = document.getElementById('buscar');
const containerList = document.getElementById('containerList');
const pokemonZoom = document.getElementById('pokemonZoom');
let currentPokemon;

buscar.addEventListener('click', buscar_click);
containerList.addEventListener('click', containerList_click);
pokemonZoom.addEventListener('click', pokemonZoom_click);

function containerList_click(e) {
    if (e.target.classList.contains('pokemon')) {
        currentPokemon = e.target;
    } else if (e.target.tagName === 'IMG' || e.target.tagName === 'P') {
        currentPokemon = e.target.parentElement;
    }

    if (currentPokemon !== undefined) {
        pokemonZoom_Mostrar();
    }
}

function pokemonZoom_click(e) {
    e.preventDefault();
    if (e.target.classList.contains('modal-close')) {
        pokemonZoom_Close();
    }
    else if (e.target.classList.contains('modal-prev') && currentPokemon.previousElementSibling !== null) {
        currentPokemon.classList.remove('pokemon-active');
        currentPokemon = currentPokemon.previousElementSibling;
        pokemonZoom_Mostrar();
    }
    else if (e.target.classList.contains('modal-next') && currentPokemon.nextElementSibling !== null) {
        currentPokemon.classList.remove('pokemon-active');
        currentPokemon = currentPokemon.nextElementSibling;
        pokemonZoom_Mostrar();
    }
}

function pokemonZoom_Close() {
    pokemonZoom.style.display = "none";
    currentPokemon.classList.remove('pokemon-active');
}

function pokemonZoom_Mostrar() {
    currentPokemon.classList.add('pokemon-active');
    pokemonZoom.style.display = "block";
    let pokemon_lg = pokemonZoom.querySelector('.pokemon-lg');
    pokemon_lg.innerHTML = currentPokemon.innerHTML;
    pokemon_lg.innerHTML += '<span class="modal-close" title="cerrar">&times;</span>';
    pokemon_lg.innerHTML += '<span class="modal-prev" title="anterior"><</span>';
    pokemon_lg.innerHTML += '<span class="modal-next" title="siguiente">></span>';
}

function buscar_click(e) {
    e.preventDefault();
    let cant = Number(cantidad.value);
    
    if (cant < 1 || cant > 893) {
        alert('Sólo se permiten números del 1 al 893');
        return;
    } 
    
    containerList.innerHTML = "";
    i = 1;
    let list = [];
    while (i <= cant) {
        const pokemonId = parseInt(Math.random() * 893);
        if (list.indexOf(pokemonId) === -1) {
            list.push(pokemonId);
            i++;
            AgregarPokemonRandom(pokemonId);
        }
    }
}

function AgregarPokemonRandom(pokemonId){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        const {name, sprites: {front_default}} = data;
        containerList.innerHTML += `
            <div class="pokemon" title='Haga click para hacer zoom'>
                <img src="${front_default}">
                <p>${name.toUpperCase()}</p>
            </div>`;        
    })
    .catch((error) => {
        console.log(error);
    });
}

//Este evento se usa para que cuando se dé click fuera del modal , el modal se cierre
window.onclick = function(event) {
    if (event.target == pokemonZoom) {
        pokemonZoom_Close();
    }
} 