import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {baseUrl} from '../../services/variables'
import { NavBar } from "../../components/NavBar";
import { ThemeContext } from "../../contexts/theme-context";
import {  useNavigate } from "react-router-dom";
    
export const PokemonsList = ({setPokemonData}) =>
{
  const {theme} = useContext(ThemeContext)
    const [pokemons, setPokemons] = useState([]);
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(10)

    const navigate = useNavigate()
    useEffect(() => {
      getPokemons(offset, limit);
    },[]);

    const loadMorePokemons = () => {
            const newOffset = offset + 10
            setOffset(newOffset)
            getPokemons(newOffset, limit) 
    };
    const loadAllPokemons = () => {
        const newOffset = offset + 10
            setOffset(newOffset)
            getPokemons(newOffset) 
        const allLimit = limit + 3000
        setLimit(allLimit)
        getPokemons(newOffset, allLimit)
    }
    const getPokemons = (offset, limit) =>{
      axios.get(`${baseUrl}pokemon?limit=${limit}&offset=${offset}`).then((response) => {
     
        const { results } = response.data;
        let pokemonsUrl = results.map((pokemon) => pokemon.url);
    
        Promise.all(
          pokemonsUrl.map((url) =>
            axios.get(url).then((response) => response.data)
          )
        ).then((pokemonDataArray) => {
          setPokemons([...pokemons, ...pokemonDataArray]);
          setAllPokemons([...allPokemons, ...pokemonDataArray]);
        });
      });
    }
    const pokemonFilter = (name) => {
      if(name===""){setPokemons(allPokemons)}else{
      var filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.includes(name));
      setPokemons(filteredPokemons);
      }
    };
   const pokemonPickHandler = (pokemon) =>{
    setPokemonData(pokemon)
    navigate("/profile")
   }

    return (<>
      <NavBar pokemonFilter={pokemonFilter}></NavBar>
      <Main>  
        <Grid background={theme.backgroundMain}>
          {pokemons.length > 0 ? (
          pokemons.map((pokemon, key) => (
              <Card key={key} background={theme.backgroundGrid}
              onClick={()=> pokemonPickHandler(pokemon)}>
    
                <img
                  alt={`Imagem do pokemon ${pokemon.name}`}
                  src={pokemon.sprites.front_default}
                ></img>
                <PokemonName color={theme.color}>{pokemon.name}</PokemonName>
              </Card>
            ))): (<p>Carregando...</p>)
          }
        </Grid>
        <ButtonDiv background={theme.backgroundMain}>
          <Button onClick={loadMorePokemons}>Carregar mais 10</Button>
          <Button onClick={loadAllPokemons}>Carregar todos os Pokemons</Button>
        </ButtonDiv>
      </Main>
      </>
    );
  };
  const Main = styled.main`
  @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap');
  font-family: "Agbalumo";
  font-weight: 400;
  height: 100vh ;
  `
  const Grid = styled.div`
    background-color: ${props => props.background};
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 20px;
    padding:20px;
  `;
  
  const Card = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${props => props.background};
    height: 100% ;
    border: solid 2px #ff524a;
    border-radius: 10px;
  `;
  const ButtonDiv = styled.div`
  background-color: ${props => props.background};
  display: flex;
  width: 100%;
  justify-content: center;
  
  
  `;
  const Button = styled.button`
    padding: 20px;
    border-radius: 10px;
    display: flex;
    cursor:pointer;
    margin: 20px;
    background-color: black;
    color: #ff524a;
    border: solid 2px #ff524a;
  `;
  const PokemonName = styled.h3`
  color: ${props => props.color};
  `