let currentOffset = 0; 
let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
           
        }
    })
})


function getStoredPokemon() {
    return JSON.parse(localStorage.getItem("pokemonList")) || []
}

function savePokemon(pokemonList) {
    localStorage.setItem("pokemonList", JSON.stringify(pokemonList))
}

function showPokemon(pokemonList) {
    let mainContainer = document.querySelector("main")
    mainContainer.innerHTML = `
<form>
    <div class="search">
    <i class="fa-solid fa-magnifying-glass" style="color: #DC0A2D;"></i>
        <input type="seach" class="search__input" placeholder="Search">
    </div>
    <button class="search__btn">A</button>
</form>`

    let divElemt1 = document.createElement("div")
    divElemt1.classList.add("pokemons__container")

    divElemt1.innerHTML = pokemonList.join("") // Insert saved Pokémon HTML

    mainContainer.append(divElemt1)

    let lastPokemon = divElemt1.querySelector("article:last-child")
    if (lastPokemon) observer.observe(lastPokemon)

    addShowMoreButton(divElemt1)
}




function fetchPokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        .then(response => response.json())
        .then(data => {
            let newPokemonHTML = data.results.map(function (pokemon) {
                let id = pokemon.url.slice(0, -1).split("/").pop()

                return `
                <article class="pokemon__card">
                    <span class="pokemon__card__id">#${id}</span>
                    <figure class="pokemon__card__img__cointainer">
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="image of a pokemon">
                    </figure>
                    <section class="pokemon__card__name">
                        <a href="details.html?id=${id}">${pokemon.name}</a>
                    </section>
                </article>
                `
            })

            // Store and show Pokémon
            let storedPokemon = getStoredPokemon()
            let updatedPokemon = storedPokemon.concat(newPokemonHTML)
            savePokemon(updatedPokemon)
            showPokemon(updatedPokemon)
        })
}

// Function to add the "Show More" button
function addShowMoreButton(parentElement) {
    let firstButton = document.querySelector(".load__btn")
    if (firstButton) firstButton.remove()

    let loadPokemon = document.createElement("button");
    loadPokemon.classList.add("load__btn", "no-columns");
    loadPokemon.innerHTML = `Show More`
    loadPokemon.addEventListener("click", function () {
        currentOffset += 20
        fetchPokemon(currentOffset)
    })

    parentElement.append(loadPokemon)
}

// Load stored Pokémon on page reload
window.addEventListener("load", function () {
    //alert("the page is loaded")
    let storedPokemon = getStoredPokemon()
    if (storedPokemon.length > 0) {
        currentOffset = storedPokemon.length// we we can addapt the off set
        showPokemon(storedPokemon)
    } else {
        fetchPokemon(currentOffset)
    }
})

// let currentOffset = 0

// let observer = new IntersectionObserver(function (entries) {
//     entries.forEach(function (entry) {
//         if (entry.isIntersecting) {
//         }
//     })
// })

// function fetchPokemon(offset) {
//     fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=21`)
//         .then(response => response.json())
//         .then(data => {
//             let divElemt1 = document.createElement("div")
//             divElemt1.classList.add("pokemons__container")
//             divElemt1.innerHTML = data.results.map(function (pokemon) {
//                 let id = pokemon.url.slice(0, -1).split("/").pop()

//                 return `
//                 <article class="pokemon__card">
//                     <span class="pokemon__card__id">#${id}</span>
//                     <figure class="pokemon__card__img__cointainer">
//                         <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="image of a pokemon">
//                     </figure>
//                     <section class="pokemon__card__name">
//                         <a href="details.html?id=${id}">${pokemon.name}</a>
//                     </section>
//                 </article>
//                 `
//             }).join("")

//             document.querySelector("main").append(divElemt1)

//             let observedPokemon = divElemt1.querySelector("article:last-child")
//             observer.observe(observedPokemon)

//             // Remove any existing "Show More" button before adding a new one
//             let firstButton = document.querySelector(".load__btn")
//             if (firstButton) firstButton.remove()

//             let loadPokemon = document.createElement("button")
//             loadPokemon.classList.add("load__btn","no-columns")
//             loadPokemon.innerHTML = `Show More`
//             loadPokemon.addEventListener("click", function () {
//                 currentOffset += 21 // Increment the offset
//                 fetchPokemon(currentOffset) // Fetch more Pokémon
//             })

//             divElemt1.append(loadPokemon)
//         })
// }

// fetchPokemon(currentOffset)