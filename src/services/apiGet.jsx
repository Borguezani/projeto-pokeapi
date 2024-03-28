import axios from "axios";

export const getPokemons = async (offset) =>{
    
  const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`);
    const { results } = response.data;
    let pokemonsUrl = results.map((pokemon) => pokemon.url);
    return await Promise.all(
        pokemonsUrl.map((url) => axios.get(url).then((response) => response.data)
        )
    );
}

export const filterPokemon = async (name) =>{
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0`)
    const { results } = response.data;
    let pokemonsFiltered = await results.filter((pokemon) => pokemon.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
    let pokemonsUrl = pokemonsFiltered ? await pokemonsFiltered.map((pokemon) => pokemon.url) : console.log("Pokemon não existe")
 
    return await Promise.all(
        pokemonsUrl.map((url) => axios.get(url).then((response) => response.data))
    )
}

export const getAbilities =  async (abilitiesUrl) => {
   const abilitiesPromises = abilitiesUrl.map( async (url) => {
        const response = await axios.get(url)
        let abilitiesFiltered = await response.data.effect_entries.filter(ability => ability.language.name === "en")
  
       if (abilitiesFiltered.length === 0) {
            return {
                name: "This pokemon hasn't abilities",
                description: "This pokemon hasn't abilities",
            };
        }else {
            return {
                name: response.data.name,
                description: abilitiesFiltered[0].effect
                
            };
        };
    });return Promise.all(abilitiesPromises) 
} 