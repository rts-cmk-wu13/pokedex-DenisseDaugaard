
function sortSearchBy (){
    // search tools 
    let searchBtn = rootElm.querySelector(".search__btn")
    let searchBox = rootElm.querySelector(".search__pokemon__options")
    let searchIcon = rootElm.querySelector(".fa-magnifying-glass")
    //console.log(searchIcon);
    //console.log(searchBox);
    //console.log(searchBar);

    searchIcon.addEventListener("click", function(){
        searchBox.classList.add("search__pokemon__options--visible")
    })


    rootElm.querySelectorAll('[name="option"]').forEach(option => {
        option.addEventListener("change", function(){

            searchBox.classList.remove("search__pokemon__options--visible")

            if(this.value == "number"){
                //console.log("number");
                searchBtn.textContent = "#"  
                
            } else{
                searchBtn.textContent = "A"

            }
            
        })
    })
    
}
