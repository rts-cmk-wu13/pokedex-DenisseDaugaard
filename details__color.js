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