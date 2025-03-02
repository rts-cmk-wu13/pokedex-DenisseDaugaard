let params = new URLSearchParams(window.location.search)
//console.log(params);
let pokemonId = params.get("id")
//console.log(pokemonId);
let detailsRootElm = document.querySelector(".details__body")


fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
.then(response => {
    console.log(response);
    if(!response.ok){
       throw new Error("Pokemon Not Found :(")
    }
    return response.json()
})
.then(pokemonData => {

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    .then(response => response.json())
    .then(speciesData =>{
    
        let dataEntry = speciesData.flavor_text_entries.filter(specific => specific.language.name ==="en" )
        //console.log(dataEntry);
        let entry = document.querySelector(".entry")
        //console.log(entry);
        entry.innerHTML = dataEntry[9].flavor_text.replace(/\f/g, " ")
        //console.log(dataEntry[1].flavor_text);
        
        function pokemoColor(){

            let colorElm = speciesData.color.name
            console.log(colorElm);
            let pokemonCardColor = document.querySelectorAll(".type__color")
            pokemonCardColor.forEach(cardColor =>{
            
                if(colorElm =="yellow"){
                    console.log("hello");
                    colorElm = "#F9CF30"
                } else if(colorElm =="green"){
                     colorElm = "#74CB48"
                } else if(colorElm == "blue"){
                    colorElm = "#6493EB"
                } else if (colorElm == "white"){
                    colorElm = "#A7B723"
                } else if (colorElm == "red"){
                    colorElm = "#F57D31"
                }
                let secondTypeBtn = document.querySelector(".types button:first-child")
                //console.log(secondTypeBtn);
                cardColor.style.backgroundColor = colorElm
                secondTypeBtn.style.backgroundColor = colorElm
                let h2 = document.querySelectorAll("h2")
                h2.forEach(h2Elm =>{
                    h2Elm.style.color = colorElm
                })
            
                let th = document.querySelectorAll("th")
                th.forEach(thElm => {
                    thElm.style.color = colorElm
                })
                //console.log(th);
                //console.log(h2);
                
            })
            //console.log(pokemonCardColor);
            
            }
            pokemoColor()

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
    pokemonDetails.classList.add("pokemon__details__card", "type__color", `background__color__${pokemonId}`)
    pokemonDetails.innerHTML = `
    <header class="pokemon__details__header">
        <h1 class="pokemon__details__header"><a href="index.html"><i class="fa-solid fa-arrow-left"></i></a> ${pokemonData.name}</h1>
        <span class ="pokemon__id">#${pokemonData.id}</span>
    </header>
    
    <figure>
        <img class="pokemon_image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" alt="image of ${pokemonData.name}">
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
                    <th class="label label__${pokemonData.id} hp">${statNameMap.hp}</th>
                    <td class="value">0${pokemonData.stats[0].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[0].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id} hp">${statNameMap.attack}</th>
                    <td class="value">0${pokemonData.stats[1].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[1].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id} hp">${statNameMap.defense}</th>
                    <td class="value">0${pokemonData.stats[2].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[2].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id} hp">${statNameMap.special}</th>
                    <td class="value">0${pokemonData.stats[3].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[3].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id} hp">${statNameMap.special_defense}</th>
                    <td class="value">0${pokemonData.stats[4].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[4].base_stat}%;"></div></div></td>
                </tr>

                <tr>
                    <th class="label label__${pokemonData.id} hp">${statNameMap.speed}</th>
                    <td class="value">0${pokemonData.stats[5].base_stat}</td>
                    <td class="bar-container"><div class="bar "><div class="fill fill__${pokemonData.id} type__color" style="width: ${pokemonData.stats[5].base_stat}%;"></div></div></td>
                </tr>

                </table>
    </section>
                `  

detailsRootElm.append(pokemonDetails) 

    

let pokemonCard = detailsRootElm.querySelector(".pokemon__details__card")
let pokemonCardId = Number(detailsRootElm.querySelector(".pokemon__id").innerHTML.trim().replace("#", ""))
    
function arrowNav (){
        //console.log(pokemonCardId);  
        console.log(pokemonCard);

        if(pokemonCardId == 1){
            console.log("its 1");
            let nextArrow = document.createElement("a")
            nextArrow.classList.add("next__arrow")
            console.log(nextArrow);
            nextArrow.innerHTML = `<img src="img/next__arrow.svg" alt="next arrow">`
            nextArrow.href = `details.html?id=${pokemonCardId +1}`

        pokemonCard.append(nextArrow) 

        } else if(pokemonCardId > 1){
            console.log("its bigger than 1");
            let nextArrow = document.createElement("a")
            nextArrow.classList.add("next__arrow")
            nextArrow.innerHTML = `<img src="img/next__arrow.svg" alt="next arrow">`
            nextArrow.href = `details.html?id=${pokemonCardId +1}`
            
            let prevArrow = document.createElement("a")
            prevArrow.classList.add("prev__arrow")
            prevArrow.innerHTML = `<img src="img/prev__arrow.svg" alt="prev arrow">`
            prevArrow.href = `details.html?id=${pokemonCardId - 1}`

            pokemonCard.append(nextArrow, prevArrow)
        } else if(pokemonCardId === 3104){

            let prevArrow = document.createElement("a")
            prevArrow.classList.add("prev__arrow")
            prevArrow.innerHTML = `<img src="img/prev__arrow.svg" alt="prev arrow">`
            prevArrow.href = `details.html?id=${pokemonCardId - 1}`
            
            pokemonCard.append(prevArrow)

        }
    }

    arrowNav()

}).catch(function(error){
    document.querySelector("body").innerHTML= `
    <h2>${error.message}</h2>
    <p>Please go back to <a href="index.html">Pokédex</a></p>  `
})