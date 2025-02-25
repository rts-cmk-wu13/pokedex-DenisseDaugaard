let currentOffset = 0

let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.style.backgroundColor = "red";
        }
    })
})

function fetchPokemon(offset) {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=21`)
        .then(response => response.json())
        .then(data => {
            let divElemt1 = document.createElement("div")
            divElemt1.classList.add("pokemons__container")
            divElemt1.innerHTML = data.results.map(function (pokemon) {
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
            }).join("")

            document.querySelector("main").append(divElemt1)

            let observedPokemon = divElemt1.querySelector("article:last-child")
            observer.observe(observedPokemon)

            // Remove any existing "Show More" button before adding a new one
            let oldButton = document.querySelector(".load__btn")
            if (oldButton) oldButton.remove()

            let loadPokemon = document.createElement("button")
            loadPokemon.classList.add("load__btn")
            loadPokemon.classList.add("no-columns")
            loadPokemon.innerHTML = `Show More`
            loadPokemon.addEventListener("click", function () {
                currentOffset += 21 // Increment the offset
                fetchPokemon(currentOffset) // Fetch more Pokémon
            })

            divElemt1.append(loadPokemon)
        })
}

// Initial fetch
fetchPokemon(currentOffset)