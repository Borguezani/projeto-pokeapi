import { createContext, useState } from "react";


export const themes = {
    light: {
        color:'#000000',
        backgroundGrid:'#ccc',
        backgroundImage:'../../assets/backgroundDay.jpg',
    },
    dark: {
        color:'#7D0000ff',
        backgroundGrid:' #000',
        backgroundImage:'../../assets/backgroundNight.jpg',
    }
}
export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {
                const [theme, setTheme] = useState(themes.light)
    return(
        <ThemeContext.Provider value={{theme, setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}