import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import { PokemonProfile } from "../Pages/PokemonProfile";

export const AppRoutes = () => {
 
  
 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          exact
          path={`/pokemon/:pokemonName`}
          element={<PokemonProfile  />}
        />
      </Routes>
    </BrowserRouter>
  );
};
