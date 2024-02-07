import React, { useContext, useEffect, useState } from "react";
import * as styled from "./styledDetailsCard";
import { NavBar } from "../NavBar";
import { ThemeContext } from "../../contexts/theme-context";
import { getAbilities } from "../../services/apiGet";
import { typeColors } from "../../utils/colorTypes";
export const PokemonCard = () => {

  const [pokemonDataStorage, setPokemonDataStorage] = useState(JSON.parse(sessionStorage.getItem("pokemonData")))
  const [abilities, setAbilities] = useState([]);
  const { theme } = useContext(ThemeContext);
  const types = [];
  const abilitiesName = [];
  const abilitiesUrl = [];

  pokemonDataStorage.types.forEach((type) => {
    types.push(type.type.name);
  });
  const colors = types.map((type) => typeColors[type]);

  pokemonDataStorage.abilities.forEach((ability) => {
    abilitiesName.push(ability.ability.name);
  });
  pokemonDataStorage.abilities.map((ability) => {
    abilitiesUrl.push(ability.ability.url);
  });

  useEffect(() => {
    getAbilities(abilitiesUrl).then((abilities) => setAbilities(abilities));
  }, []);

  const moves = [];
  pokemonDataStorage.moves.forEach((move) => {
    moves.push(move.move.name) ;
  }); 
  return (
    <styled.Profile background={theme.backgroundImage}>
      <NavBar hideSearch />
      <styled.Container>
        <styled.Card color={theme.color} background={theme.backgroundGrid}>
          <styled.FirstSection>
            <styled.ContainerName>
              <styled.Name>{pokemonDataStorage.name}</styled.Name>
              <styled.Img
                src={pokemonDataStorage.sprites.front_default}
                alt={`Imagem do pokemon ${pokemonDataStorage.name}`}
              />
              <styled.Types>
                {types.map((type, index) => (
                  <styled.Type
                    color={colors[index]}
                    background={theme.backgroundMain}
                    key={index}
                  >
                    {type}
                  </styled.Type>
                ))}
              </styled.Types>
            </styled.ContainerName>
            <styled.ContainerMoves>
              <h3>Movements</h3>
              <styled.Moves>
                {moves.length === 0 ? "This pokemon hasn't movements" : moves.map((move, index) => (
                  <styled.Move background={theme.backgroundMain} key={index}>
                    {move}
                  </styled.Move>
                ))}
              </styled.Moves>
            </styled.ContainerMoves>
          </styled.FirstSection>
          <styled.Info></styled.Info>
          <styled.LastContainer>
            <h2>Abilities</h2>
            <styled.AbilityContainer>
              <styled.Abilities>
                {abilities.map((ability, index) => (
                  <styled.Ability background={theme.backgroundMain} key={index}>
                    <h4>{ability.name}</h4>
                    <styled.Description>
                      {ability.description}
                    </styled.Description>
                  </styled.Ability>
                ))}
              </styled.Abilities>
            </styled.AbilityContainer>
          </styled.LastContainer>
        </styled.Card>
      </styled.Container>
    </styled.Profile>
  );
};
