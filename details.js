let params = new URLSearchParams(window.location.search)
//console.log(params);
let pokemonId = params.get("id")
console.log(pokemonId);

let detailsRootElm = document.querySelector(".details__body")

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
.then(response => response.json()).

then(pokemonData => {
console.log(pokemonData);
    let pokemonDetails = document.createElement("article")
    pokemonDetails.classList.add("pokemon__details__card")
    pokemonDetails.classList.add(`background__color__${pokemonId}`)
    
    
    pokemonDetails.innerHTML = `
    <header class="pokemon__details__header">
        <h1 class="pokemon__details__header"><i class="fa-solid fa-arrow-left"></i> ${pokemonData.name}</h1>
        <span class ="pokemon__id">#${pokemonData.id}</span>
    </header>
    
    <figure>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="">
    </figure>
    <section class="pokemon__details__info">
        <div class="types">
        ${pokemonData.types.map(typeElm => `
            <button class="details__type">${typeElm.type.name}</button>`).join("")}
        </div>
        <section class="pokemon__datails__about">
            <h2 class="details__sub-header sub-header__${pokemonData.id} no-columns">About</h2>
           <div class="about__details">
                <span class="about__weight">
                    <i class="fa-solid fa-weight-hanging"></i>
                    <p class="weight__amount">${pokemonData.weight/10} Kg</p>
                </span>
                <p class="weight__name">Weight</p>
           </div>
           <div class="about__details">
                <span class="about__height">
                <i class="fa-solid fa-ruler-vertical"></i>
                    <p class="weight__amount">${pokemonData.height/10} m</p>
                </span>
                <p class="weight__name">Height</p>
           </div>
           <div class="about__details">
                <span class="about__moves">
                   ${pokemonData.abilities.map(abilityElm => `
                    <p class="moves__abilities">${abilityElm.ability.name}</p>`).join("")}
                </span>
                <p class="weight__name">Moves</p>
           </div>
               <p class="no-columns">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, provident atque delectus sapiente non placeat. Minus nesciunt aliquid consequatur quibusdam.</p>
        </section>

               <h2 class="details__sub-header sub-header__${pokemonData.id}">Base Stats</h2>
               <table class="stats-table">
                ${pokemonData.stats.map(statElm =>`
                <tr>
                    <td class="label label__${pokemonData.id}  hp">${statElm.stat.name}</td>
                    <td class="value">0${statElm.base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${statElm.base_stat}%;"></div></div></td>
                </tr>`).join("")}
                </table>
                </section>
                `
    

    detailsRootElm.append(pokemonDetails)
        
    })
