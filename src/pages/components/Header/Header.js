import React from 'react'
import './Header.css'

const Header = ({ user }) => (
    <header className="header">
        <div className="header__brand">
            <p>Task Manager</p>
        </div>
        {
            user && 
            <div className="header__user">
                <p> {user.name} </p>
            </div>
        }
    </header>
)

export default Header