import { createContext, useState } from "react";


export const themes = {
    light: {
        color:'#000000',
        backgroundGrid:'#FFA500',
        backgroundMain:'#FFD700'
    },
    dark: {
        color:'#ff6e40',
        backgroundGrid:' #ccc',
        backgroundMain:'#001f3f'
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