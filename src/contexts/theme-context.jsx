import { createContext, useState } from "react";

export const themes = {
  light: {
    color: "#000000",
    backgroundGrid: "#ccc",
    backgroundImage: "../../assets/backgroundDay.jpg",
  },
  dark: {
    color: "#8e8c94",
    backgroundGrid: " #000",
    backgroundImage: "../../assets/backgroundNight.jpg",
  },
};
export const ThemeContext = createContext({});

export const ThemeProvider = (props) => {
  const storedTheme = JSON.parse(sessionStorage.getItem("themes"));
  const [theme, setTheme] = useState(storedTheme ? storedTheme : themes.light);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
