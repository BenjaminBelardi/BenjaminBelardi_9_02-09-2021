import React from "react"
import {NavLink}  from "react-router-dom"
import {ReactComponent as Yoga } from '../assets/yoga-icon.svg'
import {ReactComponent as Swim } from '../assets/swim-icon.svg'
import {ReactComponent as Cycle } from '../assets/cycle-icon.svg'
import {ReactComponent as Featness } from '../assets/featness-icon.svg'

import '../style/SportNav.css'

function SportNav (){


    return(
        <nav className='sport-nav'>
            <ul className='sport-nav-list__link'>
                <NavLink exact className='sport-nav-link' activeClassName="current" to="/">
                    <li className='sport-nav-link__color'>
                        <Yoga />
                    </li>
                </NavLink>
                <NavLink className='sport-nav-link' activeClassName="current" to="/">
                    <li className='sport-nav-link__color'>
                        <Swim />
                    </li>
                </NavLink>
                <NavLink className='sport-nav-link' activeClassName="current" to="/">
                    <li className='sport-nav-link__color'>
                        <Cycle />
                    </li>
                </NavLink>
                <NavLink className='sport-nav-link' activeClassName="current" to="/">
                    <li className='sport-nav-link__color'>
                        <Featness />
                    </li>
                </NavLink>
            </ul>
            <span className="sport-nav_copyright">Copirygth, SportSee 2021</span>
        </nav>
    )

}

export default SportNav