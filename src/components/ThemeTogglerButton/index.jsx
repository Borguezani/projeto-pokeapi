import { useContext, useState } from "react"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from "styled-components"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"
export const ThemeTogglerButton = () => {
    const {theme, setTheme} = useContext(ThemeContext)
    const [pokebolaPosition, setPokebolaPosition] = useState("0");

    const handleImageClick = () => {
        setTheme(theme === themes.light ? themes.dark : themes.light)
        setPokebolaPosition(pokebolaPosition === "0" ? "calc(100% - 40px)" : "0");
      };
    return(
        <Button background={theme.backgroundGrid}  onClick={() => handleImageClick() }>
            <FontAwesomeIcon icon={faSun} className="sun-icon" size="2x"/>
            <Pokebola id="pokebola" src="/assets/pokebola.png" alt="Imagem da Pokebola" position={pokebolaPosition} />
            <FontAwesomeIcon icon={faMoon} className="moon-icon" size="2x"/>
        </Button>
    )
}
const Button = styled.button`
display:flex;
justify-content: space-between;
align-items:center;
background-color: ${props => props.background};
border-radius:25px;
width:100px;
height:40px;
cursor:pointer;
position:relative;
.sun-icon {
    color:yellow;;
  }

  .moon-icon {
    color:#fff;;
  }
`
const Pokebola = styled.img`
position:absolute;
height:40px;
width:40px;
top:0.1;
left: ${props => props.position};
transition: left 0.5s;
`
