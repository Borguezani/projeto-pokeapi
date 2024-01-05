import React, { useContext } from "react"
import { NavBar } from "../NavBar"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"
import axios from "axios"

export const 
PokemonCard = ({pokemonData}) =>{
  const {theme} = useContext(ThemeContext)
  // console.log(pokemonData)
  const types = []
  pokemonData.types.forEach((type) => {
   types.push(type.type.name)
  });
  const abilitiesName = []
  pokemonData.abilities.forEach((ability)=>{
    abilitiesName.push(ability.ability.name)
  })
  const abilitiesUrl = []
  pokemonData.abilities.forEach((ability)=>{
    abilitiesUrl.push(ability.ability.url)
  })
  let abilitiesResponse = []
  Promise.all(
    abilitiesUrl.map((url) =>
      axios.get(url).then((response) => abilitiesResponse.push(response.data))
    )
  ).then(() => {
    console.log(abilitiesResponse[0])
  
  });
      
    
    
  const moves = []
  pokemonData.moves.forEach((move)=>{
    moves.push(move.move.name)
  })
    return(
        <>
        <NavBar hideSearch/>
        <Container color={theme.color} background={theme.backgroundMain}>
        <Card background={theme.backgroundGrid}>
        <Name>{pokemonData.name}</Name>
          <Info>
        <Img src={pokemonData.sprites.front_default} alt={`Imagem do pokemon ${pokemonData.name}`}/>
       <Types > 
         {types.map((type, index) =>(
           <Type background={theme.backgroundMain} key={index}>{type}</Type>
           ))}
       </Types>
        </Info>
            <h3>Abilities</h3>
          <Abilities> 
            {abilitiesResponse.map((ability,index) =>(
              <Ability background={theme.backgroundMain} key={index}>{ability[0].name}</Ability>
              ))}
           </Abilities>
              <h3>Moves</h3>  
        <Moves>
          {moves.map((move,index) =>(
             <Move background={theme.backgroundMain} key={index}>{move}</Move>
          ))}
        </Moves>
    </Card>
    </Container>
    </> )
}
const Container = styled.main`
@import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap');
font-family: "Agbalumo";
font-weight: 400;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
padding:20px;  
background-color: ${props => props.background};
color: ${props => props.color};
`

const Card = styled.section`
background-color: ${props => props.background};
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 650px;
height: 100vh;
border-radius: 20px;
`
const Name = styled.h1`
text-transform: uppercase;

`
const Img = styled.img`
height: 200px;
`
const Types = styled.ul`
  list-style: none;
  margin:20px;
  text-transform: uppercase;
  `
  const Type = styled.li`
  text-align: center;
  border-radius: 10px;
  padding:10px;
  margin-bottom:10px;
  background-color: ${props => props.background};
  
  `
  const Info = styled.div`
  display:flex;
  align-items:center;
  `

const Abilities = styled.ul`
width:100%;
display:flex;
list-style: none;
justify-content: space-around;
text-transform: uppercase;
`
const Ability = styled.li`
background-color: ${props => props.background};
border-radius:10px;
text-align:center;
padding:5px;
`
const Moves = styled.ul`
overflow:auto;
&::-webkit-scrollbar {
  width: 4px;}
  &::-webkit-scrollbar-thumb {
    background-color: #000;
  }
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-gap: 25px;
list-style: none;
text-transform: uppercase;
    `
const Move = styled.li`
margin: 10px;
background-color: ${props => props.background};
border-radius:10px;
text-align:center;
padding:5px;

`
  
