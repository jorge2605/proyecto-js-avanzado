let content_w = document.getElementById('content');
let dialog = document.querySelector('#info')
let btnClose = document.querySelector('.close')
let btnBuscar = document.querySelector('#txtSearch');

function addCard(nom, num, img, tip, data){
    let card = document.createElement('div')
    card.classList.add('card')

    let nombre =  document.createElement('p')
    nombre.classList.add('name')
    let nombreText = document.createTextNode(nom)

    let numero =  document.createElement('p')
    numero.classList.add('number')
    let numeroText = document.createTextNode(num)

    let image = document.createElement('img')
    image.src = img
    image.classList.add('img')

    let tipo =  document.createElement('p')
    tipo.classList.add('type')
    let tipoText = document.createTextNode(tip)

    content_w.appendChild(card)

    nombre.appendChild(nombreText)
    numero.appendChild(numeroText)
    tipo.appendChild(tipoText)
    card.append(nombre, numero, image, tipo)

    card.addEventListener('click',function(){
        let openDialog = document.querySelector('#info')
        editDialog(data);
        openDialog.showModal();
    })
}

async function fetchAndDisplayPokemon() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    try {
        const resp = await fetch(apiUrl);

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const pokemonData = await resp.json();

        for(let i = 1; i < 20; i++){
            const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
            try {
                const response = await fetch(url);
        
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
        
                const pokemonData = await response.json();
                // console.log(pokemonData)
                addCard(pokemonData.name, pokemonData.id, pokemonData.sprites.front_shiny, "Peso: "+pokemonData.weight, pokemonData)
        
            } catch (err) {
                console.error('Error al consumir la API:', err);
            }
        }
        addCard(pokemonData.name, pokemonData.id, pokemonData.sprites.front_shiny, pokemonData.types)

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

function editDialog(data){
    let lblNombre = document.querySelector('#lblNombre');
    lblNombre.classList.add('name')
    let lblNumero = document.querySelector('#lblNumero');
    lblNumero.classList.add('number')
    let img = document.querySelector('#lblImg');
    img.classList.add('lblImg')
    let divTipo = document.querySelector('.divTipo');
    divTipo.innerHTML = '<h2>Tipo:</h2>';
    let divHabilidades = document.querySelector('.divHabilidades');
    divHabilidades.innerHTML = '<h2>Habilidades:</h2>';

    for(let i = 0; i < data.abilities.length; i++){
        let p = document.createElement('p')
        let pText = document.createTextNode(data.abilities[i].ability.name)

        p.appendChild(pText)
        divHabilidades.appendChild(p)
    }
    
    for(let i = 0; i < data.types.length; i++){
        let p = document.createElement('p')
        let pText = document.createTextNode(data.types[i].type.name)

        p.appendChild(pText)
        divTipo.appendChild(p)
    }

    lblNombre.innerText = data.name;
    lblNumero.innerText = data.id;
    img.src = data.sprites.front_shiny;

}

async function searchPokemonById(event){
    let id = btnBuscar.value;
    console.dir(btnBuscar)
    if (event.key === 'Enter') {
        const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'+id;

        try {
            const resp = await fetch(apiUrl);

            if (!resp.ok) {
                throw new Error(`Error: ${resp.status}`);
            }

            const pokemonData = await resp.json();
            content_w.innerHTML = ''
            addCard(pokemonData.name, pokemonData.id, pokemonData.sprites.front_shiny, "Peso: "+pokemonData.weight, pokemonData)
        }catch(error){
            console.log(error)
        }
    }
}

fetchAndDisplayPokemon();

btnClose.addEventListener('click', function(){
    dialog.close();
})