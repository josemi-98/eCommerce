import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("dark");

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    }

    const themeContextValue = {
        theme,
        toggleTheme,
    }
    return (
        <ThemeContext.Provider value={themeContextValue}>
                {children}
        </ThemeContext.Provider>
    )
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
};
