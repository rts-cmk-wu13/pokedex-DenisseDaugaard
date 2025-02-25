let rootElm = document.querySelector("body")

rootElm.innerHTML = `
<header>
   <div class="logo__content">
    <img class="icon" src="img/pokeball.svg" alt="logo">
    <h1>Pokédex</h1>
   </div>
</header>
<main>

</main>
<footer></footer>`

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

document.querySelector("main").append(search)
//console.log(search);
