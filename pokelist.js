//console.log(rootElm);

fetch("https://pokeapi.co/api/v2/pokemon/").then(response => response.json()).
    then(data => {
       //console.log(data);

       
       let search = document.createElement("div")
       search.classList.add("seach__pokemon")
       search.innerHTML = `
       <form>
            <div class="search">
            <i class="fa-solid fa-magnifying-glass" style="color: #DC0A2D;"></i>
                <input type="seach" class="search__input" placeholder="Search">
            </div>
            <button class="search__btn">A</button>
       </form>
       `
       console.log(search);
       
       
        let divElemt1 = document.createElement("div")
        divElemt1.classList.add("pokemons__container")
        divElemt1.innerHTML = data.results.map(function(pokemon){
        
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
    

    document.querySelector("main").append( search, divElemt1)

    })
