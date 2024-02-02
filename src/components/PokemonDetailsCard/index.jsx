import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/theme-context";
import axios from "axios";
import { typeColors } from "../../services/colorTypes";
export const PokemonCard = ({ pokemonData }) => {
  const [dataEffects, setDataEffects] = useState([]);
  const { theme } = useContext(ThemeContext);

  const types = [];
  pokemonData.types.forEach((type) => {
    types.push(type.type.name);
  });
  const colors = types.map((type) => typeColors[type]);
  const abilitiesName = [];
  pokemonData.abilities.forEach((ability) => {
    abilitiesName.push(ability.ability.name);
  });
  const abilitiesUrl = [];
  pokemonData.abilities.map((ability) => {
    abilitiesUrl.push(ability.ability.url);
  });
  const abilitiesPromise = Promise.all(
    abilitiesUrl.map((url) =>
      axios
        .get(url)
        .then((response) => response.data)
        .then((response) => {
          const filteredDescription = response.effect_entries.filter(
            (ability) => ability.language.name === "en"
          );
          if (filteredDescription.length === 0) {
            return {
              name: "This pokemon hasn't abilities",
              description: "This pokemon hasn't abilities",
            };
          } else {
            return {
              name: response.name,
              description: filteredDescription[0].effect,
            };
          }
        })
    )
  ).then((abilitiesDataArray) => {
    return abilitiesDataArray;
  });

  useEffect(() => {
    abilitiesPromise.then((abilitiesDataArray) => {
      setDataEffects(abilitiesDataArray);
    });
  }, []);

  const moves = [];
  pokemonData.moves.forEach((move) => {
    moves.push(move.move.name);
  });
  return (
    <ProfileCard background={theme.backgroundImage}>
      <NavBar hideSearch />
      <Container>
        <Card color={theme.color} background={theme.backgroundGrid}>
          <Name>{pokemonData.name}</Name>
          <Info>
            <Img
              src={pokemonData.sprites.front_default}
              alt={`Imagem do pokemon ${pokemonData.name}`}
            />
            <Types>
              {types.map((type, index) => (
                <Type
                  color={colors[index]}
                  background={theme.backgroundMain}
                  key={index}
                >
                  {type}
                </Type>
              ))}
            </Types>
          </Info>
          <h2>Abilities</h2>
          <AbilityContainer>
            <Abilities>
              {dataEffects.map((ability, index) => (
                <Ability background={theme.backgroundMain} key={index}>
                  <h4>{ability.name}</h4>
                  <Description>{ability.description}</Description>
                </Ability>
              ))}
            </Abilities>
          </AbilityContainer>
          <h3>Moves</h3>
          <Moves>
            {moves.map((move, index) => (
              <Move background={theme.backgroundMain} key={index}>
                {move}
              </Move>
            ))}
          </Moves>
        </Card>
      </Container>
    </ProfileCard>
  );
};
const ProfileCard = styled.div`
  background-image: url(${(props) => props.background});
  transition: background-image ease-in-out 1s;
  background-attachment: fixed;
`;
const Container = styled.main`
  @import url("https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap");
  font-family: "Agbalumo";
  font-weight: 400;

  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: center;
`;
const AbilityContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`;
const Description = styled.p`
  font-size: 0.8em;
`;
const Card = styled.section`
  padding: 10px;
  color: ${(props) => props.color};
  transition: ease-in-out 0.5s;
  background-color: ${(props) => props.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 650px;

  border-radius: 20px;
`;
const Name = styled.h1`
  text-transform: uppercase;
`;
const Img = styled.img`
  height: 200px;
`;
const Types = styled.ul`
  list-style: none;
  margin: 20px;
  text-transform: uppercase;
`;
const Type = styled.li`
  background-color: ${(props) => props.color};
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Abilities = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  text-transform: uppercase;
  flex-direction: column;
`;
const Ability = styled.li`
  background-color: ${(props) => props.background};
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;
const Moves = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 25px;
  list-style: none;
  text-transform: uppercase;
`;
const Move = styled.li`
  margin: 10px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;
