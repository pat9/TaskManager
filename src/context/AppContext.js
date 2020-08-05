import React, { createContext, useState } from 'react'

export const AppContext = createContext({})

export const AppContextProvider = ({ children }) => {
    const [ isLogged, setIsLogged ] = useState(() => {
        const user = JSON.parse(localStorage.getItem('userTaskMaganer'))
        return user ? true: false
    })
    const [ user, setUser ] = useState(() => {
        const user = JSON.parse(localStorage.getItem('userTaskMaganer'))
        return user ? user: null
    })

    const changeAuth = ( isLoggedValue, userData ) => {
        setIsLogged(isLoggedValue)
        setUser(userData)
        localStorage.setItem('userTaskMaganer', JSON.stringify(userData))
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