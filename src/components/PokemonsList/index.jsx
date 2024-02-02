import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { baseURL } from "../../services/variables";
import { NavBar } from "../../components/NavBar";
import { ThemeContext } from "../../contexts/theme-context";
import { useNavigate } from "react-router-dom";
import { typeColors } from "../../services/colorTypes";

export const PokemonsList = ({ setPokemonData }) => {
  const { theme } = useContext(ThemeContext);
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(10);
  const [filteredPokemons, setFilteredPokemons] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=3000&offset=0`)
      .then((response) => {
        const { results } = response.data;
        let pokemonsUrl = results.map((pokemon) => pokemon.url);

        Promise.all(
          pokemonsUrl.map((url) =>
            axios.get(url).then((response) => response.data)
          )
        ).then((pokemonDataArray) => {
          const first10pokemons = pokemonDataArray.slice(0, offset);

          setPokemons([...pokemons, ...first10pokemons]);
          setAllPokemons([...pokemonDataArray]);
          setFilteredPokemons([...pokemons, ...first10pokemons]);
        });
      });
  }, []);

  const types = [];
  pokemons.map((pokemon) => {
    types.push(pokemon.types[0].type.name);
  });
  const colors = types.map((type) => typeColors[type]);

  const loadMorePokemons = (pokemons, allPokemons) => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    const morePokemons = allPokemons.slice(pokemons.length, newOffset);
    pokemons.push(...morePokemons);
    setPokemons(pokemons);
  };

  const pokemonFilter = (name) => {
    var filteredPokemon = allPokemons.filter((pokemon) =>
      pokemon.name.includes(name)
    );

    if (name === "") {
      setPokemons(filteredPokemons);
    } else {
      setPokemons(filteredPokemon);
    }
  };

  const pokemonPickHandler = (pokemon) => {
    setPokemonData(pokemon);
    navigate(`/pokemon/${pokemon.name}`);
  };

  return (
    <>
      <Main background={theme.backgroundImage}>
        <NavBar
          pokemonFilter={pokemonFilter}
          pokemons={pokemons}
          setPokemons={setPokemons}
        ></NavBar>
        <Grid>
          {pokemons.length > 0 ? (
            pokemons.map((pokemon, key) => (
              <Card
                key={key}
                background={colors[key]}
                onClick={() => pokemonPickHandler(pokemon)}
              >
                <img
                  alt={`Imagem do pokemon ${pokemon.name}`}
                  src={pokemon.sprites.front_default}
                ></img>
                <PokemonName color={theme.color}>{pokemon.name}</PokemonName>
              </Card>
            ))
          ) : (
            <LoadingContainer>
              <Loading></Loading>
            </LoadingContainer>
          )}
        </Grid>
        <ButtonDiv>
          <Button
            color={theme.color}
            background={theme.backgroundGrid}
            onClick={() => loadMorePokemons(pokemons, allPokemons)}
          >
            Carregar mais 10
          </Button>
        </ButtonDiv>
      </Main>
    </>
  );
};
const animateLoading = keyframes`
to{transform: rotate(360deg);}`;
const Loading = styled.p`
  width: 40px;
  height: 40px;
  border: 10px solid;
  border-radius: 50%;
  border-color: #ffe662;
  border-top-color: transparent;
  animation: ${animateLoading} 0.6s linear infinite;
`;
const LoadingContainer = styled.div`
  align-items: center;

  display: flex;
  justify-content: center;
`;
const Main = styled.main`
  transition: background-image ease-in-out 1s;
  background-size: cover;
  background-image: url(${(props) => props.background});
  background-attachment: fixed;
  @import url("https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap");
  font-family: "Agbalumo";
  font-weight: 400;
  width: 100%;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  padding: 40px;
  margin: 62px;
`;

const Card = styled.div`
  transition: background-color ease-in-out 1s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 10px;
`;
const ButtonDiv = styled.div`
  position: relative;
  top: -50px;
  display: flex;
  width: 100%;
  justify-content: center;
`;
const Button = styled.button`
  transition: ease-in-out 1s;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  margin: 20px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
`;
const PokemonName = styled.h3`
  color: ${(props) => props.color};
`;
