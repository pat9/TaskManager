import React, { useContext } from 'react'
import { AppContext } from '../../../context/AppContext'
import './Header.css'
import { useHistory } from 'react-router-dom'

const Header = () => {
    const { user,changeAuth } = useContext(AppContext)
    const { push } = useHistory()

    const logout = () => {
        changeAuth(false, null)
        push('/')
    } 

    return(
    <header className="header">
        <div className="header__brand">
            <p>Task Manager</p>
        </div>
        {
            user && 
            <div className="header__user">
                <p> {user.name} </p>
                <a onClick={logout} > Logout </a>
            </div>
        }
    </header>
    )
}

export default Header