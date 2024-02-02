import { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../contexts/theme-context";
import { ThemeTogglerButton } from "../ThemeTogglerButton";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ pokemonFilter, hideSearch }) => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [pokemonName, setPokemonName] = useState("");
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      pokemonFilter(pokemonName);
    }
  };
  return (
    <Header>
      <Logo
        src="/assets/pokemon-logo.png"
        alt="Logo do pokemon"
        onClick={() => navigate("/")}
      ></Logo>

      {!hideSearch && (
        <Search
          border={theme.backgroundGrid}
          type="text"
          placeholder="Search..."
          onKeyDown={handleKeyDown}
          onChange={(e) => pokemonFilter(e.target.value)}
        ></Search>
      )}
      <ThemeTogglerButton />
    </Header>
  );
};
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4em;
`;
const Logo = styled.img`
  height: 3em;
  cursor: pointer;
  margin-left: 10px;
`;
const Search = styled.input`
  transition: ease-in-out 1s;
  padding: 10px;
  border: solid 2px ${(props) => props.border};
  border-radius: 10px;
`;
