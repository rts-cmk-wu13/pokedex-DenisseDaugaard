//console.log(rootElm);
let currentOffset = 0

 
let obsever = new IntersectionObserver(function(entries){
    entries.forEach(function (entry){
        //console.log(entry.target); //this is my elemnt 
        if (entry.isIntersecting){
            entry.target.style.backgroundColor = "red"
             currentOffset = currentOffset + 21
        }
    })
})

function fetchPokemon (offset){
fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=21`).then(response => response.json()).
    then(data => {
       //console.log(data);
    
        let divElemt1 = document.createElement("div")
        divElemt1.classList.add("pokemons__container")
        divElemt1.innerHTML += data.results.map(function(pokemon){
        let id = pokemon.url.slice(0, -1).split("/").pop()
        //console.log(id);

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
    //console.log(observedPokemon);
    obsever.observe(observedPokemon)

    let loadPokemon = document.createElement("button")
    loadPokemon.classList.add("load__btn")
    loadPokemon.innerHTML =`Show More`
    divElemt1.append(loadPokemon)

    })
}

fetchPokemon (currentOffset)