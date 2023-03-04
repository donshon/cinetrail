import React, {useState, createContext, useEffect} from 'react'

// 1 create a blank context
export const UserContext = createContext();
// 2 assign value
// 3 provide value to children 

export default function UserContextProvider(props) {
    //create my global state
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    //check if in light mode or dark mode
    useEffect(
        ()=>{
          //get value from local storage
          setToken(localStorage.getItem('token'))
          setUser(JSON.parse(localStorage.getItem('userInfo')))
        }, []
      )

  return (
    <div>
        <UserContext.Provider value={{user, setUser, token, setToken}}>
            {props.children}
        </UserContext.Provider>
    </div>
  )
}
