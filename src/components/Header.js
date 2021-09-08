import React from "react"
import {NavLink}  from "react-router-dom"
import {ReactComponent as Logo} from '../assets/logo.svg'
import '../style/Header.css'

function Header (){


    return(
        <header className='header'>
                    <NavLink  exact to="/">   
                        <Logo className="main-logo"/>
                    </NavLink>
                    <nav className='main-nav'>
                        <ul className='main-nav-list__link'>
                            <NavLink exact className='main-nav-link' activeClassName="current" to="/">
                                <li className='main-nav-link__color'>Accueil</li>
                            </NavLink>
                            <NavLink className='main-nav-link' activeClassName="current" to="/profil">
                                <li className='main-nav-link__color'>Profil</li>
                            </NavLink>
                            <NavLink className='main-nav-link' activeClassName="current" to="/reglage">
                                <li className='main-nav-link__color'>Réglage</li>
                            </NavLink>
                            <NavLink className='main-nav-link' activeClassName="current" to="/Communaute">
                                <li className='main-nav-link__color'>Communauté</li>
                            </NavLink>
                        </ul>
                    </nav>
            </header>
    )

}

export default Header