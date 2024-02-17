// Seleccionar el contenedor de la lista de Pokémon
const listaPokemon = document.querySelector("#listaPokemon");

// Seleccionar todos los botones de la barra de navegación
const botonesHeader = document.querySelectorAll(".btn-header");

// Seleccionar el campo de entrada de búsqueda y el botón de búsqueda
const inputBusqueda = document.querySelector("#searchInput");
const btnBuscar = document.querySelector("#searchButton");

// URL base para la API de Pokémon
let URL = "https://pokeapi.co/api/v2/pokemon/";

// Cargar información de los primeros 151 Pokémon al cargar la página
for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}

// Función para mostrar la información de un Pokémon en el DOM
function mostrarPokemon(poke) {
    // Obtener los tipos del Pokémon y formatearlos
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    // Formatear el ID del Pokémon
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }

    // Crear un nuevo elemento div para el Pokémon
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    // Agregar el nuevo elemento al contenedor de la lista de Pokémon
    listaPokemon.append(div);
}

// Función para buscar Pokémon según el término de búsqueda
function buscarPokemon(terminoBusqueda) {
    listaPokemon.innerHTML = ""; // Limpiar la lista antes de mostrar resultados

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then((data) => {
                const nombrePokemon = data.name.toLowerCase();
                if (nombrePokemon.includes(terminoBusqueda)) {
                    mostrarPokemon(data);
                }
            });
    }
}

// Event listener para el botón de búsqueda
btnBuscar.addEventListener("click", () => {
    const terminoBusqueda = inputBusqueda.value.toLowerCase().trim();
    if (terminoBusqueda !== "") {
        buscarPokemon(terminoBusqueda);
    }
});

// Event listener para los botones de la barra de navegación
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; // Limpiar la lista antes de mostrar resultados

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if (botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            });
    }
}));
