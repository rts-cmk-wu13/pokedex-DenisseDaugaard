
function searchPokemon (){
    let searchBox = document.querySelector(".search__pokemon__options")
    searchBox.innerHTML = `
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
        </div>
    </div>
    `
    console.log(searchBox);
    

    
}
