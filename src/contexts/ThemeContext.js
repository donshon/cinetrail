import React, {useState, createContext, useEffect} from 'react'

// 1 create a blank context
export const ThemeContext = createContext();
// 2 assign value
// 3 provide value to children 

export default function ThemeContextProvider(props) {
    //create my global state
    const [darkMode, setDarkMode] = useState(false)
    //check if in light mode or dark mode
    useEffect(
        ()=>{
          //get value from local storage
          const theme = localStorage.getItem("darkmode")
          //make sure it's not null
          if (theme != null) {
            //all value in storage are strings
            setDarkMode(JSON.parse(theme))
          }
        }, []
      )

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}