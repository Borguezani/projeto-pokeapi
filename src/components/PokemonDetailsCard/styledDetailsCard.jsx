import styled from "styled-components";

export const ContainerName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  border: solid 1px grey;
  margin: 20px;
  padding: 20px;
`;

export const FirstSection = styled.div`
  display: flex;
  height: 500px;
  margin: 20px;
`;
export const ContainerMoves = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px grey;
  margin-left: 40px;
`;

export const Container = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Agbalumo&family=Open+Sans&family=Poppins:wght@400;600&family=Roboto:wght@400;700;900&display=swap");
  font-family: "Agbalumo";
  font-weight: 400;

  display: flex;
  align-items: center;
  padding: 20px;
  justify-content: center;
`;
export const LastContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px grey;
`;

export const Profile = styled.main`
  background-image: url(${(props) => props.background});
  transition: background-image ease-in-out 1s;
  background-attachment: fixed;
`;

export const AbilityContainer = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
`;

export const Description = styled.p`
  font-size: 0.8em;
`;

export const Card = styled.section`
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
export const Name = styled.h1`
  text-transform: uppercase;
`;
export const Img = styled.img`
  height: 200px;
`;
export const Types = styled.ul`
  list-style: none;
  margin: 20px;
  text-transform: uppercase;
`;
export const Type = styled.li`
  background-color: ${(props) => props.color};
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;
export const Info = styled.div`
  display: flex;
  align-items: center;
`;

export const Abilities = styled.ul`
  width: 100%;
  display: flex;
  list-style: none;
  justify-content: space-around;
  text-transform: uppercase;
  flex-direction: column;
`;
export const Ability = styled.li`
  background-color: ${(props) => props.background};
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;
export const Moves = styled.ul`
  padding: 20px;
  list-style: none;
  text-transform: uppercase;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 20px;
    border: 3px solid white;
  }
`;
export const Move = styled.li`
  margin: 10px;
  background-color: ${(props) => props.background};
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;
