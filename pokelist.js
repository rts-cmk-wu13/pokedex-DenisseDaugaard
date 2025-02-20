
fetch("https://pokeapi.co/api/v2/pokemon/", {
    
}).then(response => response.json()).
    then(data => {
       console.log(data);
       
    let divElemt1 = document.createElement("div")

        divElemt1.innerHTML = data.results.map(function(pokemon){
        let id = pokemon.url.slice(0, -1).split("/").pop()
        console.log(id);
    
        return `<article>
                <h2>${pokemon.name}</h2>
                </article>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
            </article>`

    }).join("")
    
    document.querySelector("main").append(divElemt1)
    })
