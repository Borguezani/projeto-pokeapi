import React, { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "../Pages/Home"
import { PokemonProfile } from "../Pages/PokemonProfile"

    
export const AppRoutes = () =>{
    const [pokemonData, setPokemonData] = useState([])
    return(
        <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home setPokemonData={setPokemonData}/>} />
        <Route exact path="/profile/"  element={<PokemonProfile pokemonData={pokemonData}/>}/>
        </Routes>
        </BrowserRouter>
        
    )
}
