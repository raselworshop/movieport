import React, { createContext, useEffect, useState } from 'react';
export const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme')||"light");
    useEffect(()=>{
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme)
    },[theme]);
    const toggleTheme =()=>{
        const newTheme = theme=== "light"? 'dark':'light';
        setTheme(newTheme)
    }
    const themeInfo={
        theme, 
        toggleTheme
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;