import styled, { keyframes } from "styled-components"

export const animateLoading = keyframes`
to{transform: rotate(360deg);}`;
export const Loading = styled.p`
  width: 40px;
  height: 40px;
  border: 10px solid;
  border-radius: 50%;
  border-color: #ffe662;
  border-top-color: transparent;
  animation: ${animateLoading} 0.6s linear infinite;
`;
export const LoadingContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
export const Main = styled.main`
  transition: background-image ease-in-out 1s;
  background-size: cover;
  background-image: url(${(props) => props.background});
  background-attachment: fixed;
  @import url("https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap");
  font-family: "Agbalumo";
  font-weight: 400;
  width: 100%;
`;
export const Grid = styled.div` 
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 40px;
  padding: 40px;
  margin: 62px;
  :hover{
    top: -20px;
  }
  &:hover > img {
    box-shadow: unset;
    top: 0px;
    opacity: 0.7;  
  }
  @media (max-width: 640px){
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 485px){
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Card = styled.div`
position:relative;
  transition: background-color ease-in-out 1s;
     max-width: 300px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  
  & img {
    width: 100px;
  }
`;
export const ButtonDiv = styled.div`
  position: relative;
  top: -50px;
  display: flex;
  width: 100%;
  justify-content: center;
`;
export const Button = styled.button`
  transition: ease-in-out 1s;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  cursor: pointer;
  margin: 20px;
  background-color: ${(props) => props.background};
  color: ${(props) => props.color};
`;
export const PokemonName = styled.h3`
  color: ${(props) => props.color};
`;
