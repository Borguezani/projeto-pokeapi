import { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"
import { ThemeTogglerButton } from "../ThemeTogglerButton"
import { useNavigate } from "react-router-dom"

export const NavBar = ({pokemonFilter, hideSearch}) => {
        const navigate = useNavigate();
        const {theme} = useContext(ThemeContext)
        
    return(
        <Header background={theme.backgroundGrid}>
                <Logo src="/assets/pokemon-logo.png" alt="Logo do pokemon" onClick={()=> navigate("/")}></Logo>
        
                {!hideSearch && (<Search type="text" placeholder="Search..." onChange={(e)=>pokemonFilter(e.target.value)}></Search>)}
                <ThemeTogglerButton/>
        
        </Header> )
}
const Header = styled.header`
display:flex;
justify-content: space-between;
align-items: center;
background-color: ${props => props.background};
height: 4em;

`
const Logo = styled.img`
height:3em;
cursor:pointer;
margin-left: 10px;
`
const Search = styled.input`
padding:10px;
border: solid 2px red;
border-radius:10px;
`