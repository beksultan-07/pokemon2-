let urlAllPokemon = 'https://pokeapi.co/api/v2/pokemon/'

let urlPokemon = 'https://pokeapi.co/api/v2/pokemon/'
let codeUrl = 0
let statusUrlStart = `https://pokeapi.co/api/v2/pokemon/?offset=`
let statusUrlEnd = `&limit=20`

function getPokemon(url){
    return new Promise((resolve, reject) => {
        $.ajax({url}).done(resolve).catch(reject)
    })
}

let addToHTML = function(pokemonInfo){
    let typePokemon = ''
    pokemonInfo.types.forEach(element => {
        typePokemon += element.type.name + ' '
    })
    let card = 
        `<div class="card">
            <img src="${pokemonInfo.sprites.front_default}" alt="">
            <div class="pokemonInfo">
                <h4>name: <span class="name">${pokemonInfo.name}</span></h4>
                <h4>type: <span class="type">${typePokemon}</span></h4=>
                <h4>height: <span class="height">${pokemonInfo.height}</span></h4>
                <h4>weight: <span class="weight">${pokemonInfo.weight}</span></h4>
            </div>
        </div>`
    $('.cards').append(card)
}

let showPokemon = function(allPokemon){
    $('.card').remove()
    allPokemon.results.forEach(element => {
        getPokemon(urlPokemon + element.name)
            .then(addToHTML)
    });
}

getPokemon(urlAllPokemon)
    .then(allPokemon => {
        showPokemon(allPokemon)
    })

let changeCard = function (){
    let toPromise = statusUrlStart + codeUrl + statusUrlEnd
    getPokemon(toPromise)
        .then(allPokemon => {
            showPokemon(allPokemon)
        })   
}

function clickButton(statusUrl){
    return function() {
        if (statusUrl === 'next'){
            codeUrl += 20
            changeCard()
        }else if (statusUrl === 'prev' && codeUrl > 0){
            codeUrl -= 20
            changeCard()
        }
    
    }
}
$('.next').click(clickButton('next'));
$('.prev').click(clickButton('prev'));