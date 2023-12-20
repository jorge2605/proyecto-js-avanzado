let content_w = document.getElementById('content');
// const apiUrl = 'https://storage.googleapis.com/campus-cvs/00000000000-images-lectures/pokemons.json';

// async function fetchPokemonData() {
//     try {
//       const response = await fetch(apiUrl);
  
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status}`);
//       }
  
//       const pokemonData = await response.json();
  
//       return pokemonData;
//     } catch (error) {
//       console.error('Error al consumir la API:', error);
//       throw error;
//     }
//   }
  
  function addCard(nom, num, img, tip){
    let card = document.createElement('div')
    card.classList.add('card')

    let nombre =  document.createElement('p')
    let nombreText = document.createTextNode(nom)

    let numero =  document.createElement('p')
    let numeroText = document.createTextNode(num)

    let image = document.createElement('img')
    image.src = img
    image.classList.add('img')

    let tipo =  document.createElement('p')
    let tipoText = document.createTextNode(tip)

    content_w.appendChild(card)

    nombre.appendChild(nombreText)
    numero.appendChild(numeroText)
    tipo.appendChild(tipoText)
    card.append(nombre, numero, image, tipo)

    
  }

//   async function fetchAndDisplayPokemonData() {
//     try {
//         const pokemonData = await fetchPokemonData();
//         pokemonData.forEach(element => {
//             addCard(element.name,element.number, element.ThumbnailImage, element.type)
//         });
//         // console.log(pokemonData)
//     } catch (error) {
//       console.error('Error al manejar los datos de Pokémon:', error);
//     }
//   }
  
//   // Llamar a la función principal
//   fetchAndDisplayPokemonData();

async function fetchAndDisplayPokemon() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    try {
        const resp = await fetch(apiUrl);

        if (!resp.ok) {
            throw new Error(`Error: ${resp.status}`);
        }

        const pokemonData = await resp.json();

        console.dir(pokemonData.count)
        for(let i = 1; i < 40; i++){
            const url = 'https://pokeapi.co/api/v2/pokemon/' + i;
            try {
                const response = await fetch(url);
        
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
        
                const pokemonData = await response.json();
        
                for(let i = 0; i < pokemonData.count; i++){
                    
                }
                addCard(pokemonData.name, pokemonData.id, pokemonData.sprites.front_shiny, pokemonData.types)
        
            } catch (err) {
                console.error('Error al consumir la API:', err);
            }
        }
        addCard(pokemonData.name, pokemonData.id, pokemonData.sprites.front_shiny, pokemonData.types)

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
}

// Llamar a la función para mostrar los Pokémon
fetchAndDisplayPokemon();