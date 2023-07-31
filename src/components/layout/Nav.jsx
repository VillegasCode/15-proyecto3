import React from 'react'
import { NavLink } from 'react-router-dom'

export const Nav = () => {
  return (
        <nav className="nav">
            <ul>
                <li><NavLink to="/inicio">Home</NavLink></li>
                <li><NavLink to="/articulos">Articles</NavLink></li>
                <li><NavLink to="/crear-articulos">Create Articles</NavLink></li>
                <li><NavLink to="/contacto">Contact</NavLink></li>
            </ul>
        </nav>
  )
}
