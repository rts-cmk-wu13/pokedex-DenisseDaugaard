let params = new URLSearchParams(window.location.search)
//console.log(params);
let pokemonId = params.get("id")
//console.log(pokemonId);

let detailsRootElm = document.querySelector(".details__body")

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
.then(response => response.json()).

then(pokemonData => {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    .then(response => response.json()).
    then(speciesData =>{
        console.log(speciesData);
        
        let dataEntry = speciesData.flavor_text_entries.filter(specific => specific.language.name ==="en" )
        //console.log(dataEntry);
        let entry = document.querySelector(".entry")
        //console.log(entry);
        entry.innerHTML = dataEntry[9].flavor_text.replace(/\f/g, " ")
        //console.log(dataEntry[1].flavor_text);


        // let colorElm = speciesData.color.name
        // console.log(colorElm);
        // let tdColor = document.querySelectorAll(".fill")
        // tdColor.forEach(colorBar =>{
        //     colorBar.style.backgroundColor = colorElm
        // })
        // console.log(tdColor);
        

    })

    

    let statNameMap = {
        "hp": "HP",
        "attack": "ATK",
        "defense": "DEF",
        "special": "SATK",
        "special_defense": "SDEF",
        "speed": "SPD"
    };
   
    //console.log(pokemonData);
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
            <button class="details__type__btn__${pokemonData.id}">${typeElm.type.name}</button>`).join("")}
        </div>
        <section class="pokemon__datails__about">
            <h2 class="details__sub-header sub-header__${pokemonData.id} no-columns">About</h2>
           <div class="about__details">
                <span class="about__weight">
                    <img class="about__icon" src="img/weight.svg" alt="icon image">
                    <p class="weight__amount">${pokemonData.weight/10} Kg</p>
                </span>
                <p class="weight__name">Weight</p>
           </div>
           <div class="about__details">
                <span class="about__height">
                <img class="about__icon" src="img/height.svg" alt="icon image">
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
            
           <p class="no-columns entry"></p>

        </section>

               <h2 class="details__sub-header sub-header__${pokemonData.id}">Base Stats</h2>
               <table class="stats-table">
                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.hp}</th>
                    <td class="value">0${pokemonData.stats[0].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[0].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.attack}</th>
                    <td class="value">0${pokemonData.stats[1].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[1].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.defense}</th>
                    <td class="value">0${pokemonData.stats[2].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[2].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.special}</th>
                    <td class="value">0${pokemonData.stats[3].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[3].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.special_defense}</th>
                    <td class="value">0${pokemonData.stats[4].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[4].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id}  hp">${statNameMap.speed}</th>
                    <td class="value">0${pokemonData.stats[5].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id}" style="width: ${pokemonData.stats[5].base_stat}%;"></div></div></td>
                </tr>

                </table>
                </section>
                `    
    
    detailsRootElm.append(pokemonDetails)   
    })
