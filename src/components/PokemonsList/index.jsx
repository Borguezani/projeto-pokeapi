import { useContext, useEffect, useState } from "react";
import { getPokemons, filterPokemon } from "../../services/apiGet";
import {
  PokemonName,
  Loading,
  LoadingContainer,
  Main,
  Grid,
  Card,
  ButtonDiv,
  Button,
} from "./styledPokemonList";
import { NavBar } from "../NavBar";
import { ThemeContext } from "../../contexts/theme-context";
import { useNavigate } from "react-router-dom";
import { typeColors } from "../../utils/colorTypes";

export const PokemonsList = () => {
  const { theme } = useContext(ThemeContext);
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const types = [];
  const navigate = useNavigate();
  
  useEffect(() => {
    getPokemons(offset).then((pokemonDataArray) => {
      setPokemons([...pokemons, ...pokemonDataArray]);
      setAllPokemons([...pokemons, ...pokemonDataArray]);
    });
  }, [offset]);
  
  const loadMorePokemons = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
  };
  pokemons.map((pokemon) => {
    types.push(pokemon.types[0].type.name);
  });
  const colors = types.map((type) => typeColors[type]);

   function pokemonFilter (name) {
    if (name === "") {
      setPokemons([...allPokemons]);
    } else {
      filterPokemon(name).then((pokemonFilteredArray) => {
        setPokemons([...pokemonFilteredArray]);
      });
    }
  };
  const pokemonPickHandler = (pokemon) => {
    sessionStorage.setItem("pokemonData", JSON.stringify(pokemon))
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
