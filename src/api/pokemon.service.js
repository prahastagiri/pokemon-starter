// const PROXY_URL = "/proxy?url=";

function getPokemonData(pokemon) {
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    return fetch(apiUrl, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson) {
        return responseJson;
      }
    })
    .catch((error) => {
      return { error: true, message: error };
    });
}

function getRandomName(gender) {
    // var genderCode = gender==='male' ? 'boy_names' : 'girl_names';
    
    let apiUrl = 'https://api.namefake.com/english-united-states/'+gender+'/';
    return fetch(apiUrl, {method: 'GET'})
    .then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson,'service')
    //   if (responseJson) {
    //     return responseJson;
    //   }
    })
    // .catch((error) => {
    //   return { error: true, message: error };
    // });
}


export const PokemonService = {
    getPokemonData,
    getRandomName
}
