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
<form action="details.html?id=">
    <div class="search">
    <i class="fa-solid fa-magnifying-glass" style="color: #DC0A2D;"></i>
        <input type="seach" class="search__input" placeholder="Search"  name="id">
    </div>
    <button class="search__btn">A</button>
</form>
<div class="search__pokemon__options">
<h3 class="options__title">Sort By:</h3>
    <div class="search__options">
            <div class="radio-container">
            <label class="custom-radio">
                <input type="radio" name="option" value="number">
                <span class="radio-circle"></span>
                Number
            </label>
        </div>

        <div class="radio-container">
            <label class="custom-radio">
                <input type="radio" name="option" value="name" checked>
                <span class="radio-circle"></span>
                Name
            </label>
</div>`

    let divElemt1 = document.createElement("div")
    divElemt1.classList.add("pokemons__container")

    divElemt1.innerHTML = pokemonList.join("") // Insert saved Pokémon HTML

    mainContainer.append(divElemt1)

    let lastPokemon = divElemt1.querySelector("article:last-child")
    if (lastPokemon) observer.observe(lastPokemon)

    addShowMoreButton(divElemt1)
    sortSearchBy()
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
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="image of ${pokemon.name}">
                    </figure>
                    <section class="pokemon__card__name">
                        <a href="details.html?id=${id}">${pokemon.name}</a>
                    </section>
                </article>
                `
            })

            let storedPokemon = getStoredPokemon()
            let updatedPokemon = storedPokemon.concat(newPokemonHTML)
            savePokemon(updatedPokemon)
            showPokemon(updatedPokemon)
           
            searchPokemon (updatedPokemon)
            
        })
}


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