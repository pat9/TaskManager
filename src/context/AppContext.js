import React, { createContext, useState } from 'react'

export const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
    const [ isLogged, setIsLogged ] = useState(false)
    const [ user, setUser ] = useState({})

    const changeAuth = ( isLoggedValue, userData ) => {
        setIsLogged(isLoggedValue)
        setUser(userData)
    }

    const value = {
        isLogged,
        user,
        changeAuth
    }

    return ( 
        <AppContext.Provider value={ value }>
            { children }
        </AppContext.Provider>
     )
}