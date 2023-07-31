import React from 'react'
import { Link } from "react-router-dom"

export const Inicio = () => {
  return (
    <div className='jumbo'>
      <h1>Welcome to Blog App<br/>developed with the next technologies:</h1>
        <ul>
          <li>HTML5</li>
          <li>CSS</li>
          <li>Javascript</li>
          <li>MongoDB</li>  
          <li>Express</li>  
          <li>React</li>
          <li>NodeJS</li>
          <li>REST service</li>
          <li>API</li>
          <li>HTTP methods</li>
        </ul>
        <p>Blog App let us make requests to SERVER and load each one of articles, also let us create articles, read them, update them and delete them, let us make totality CRUD operations of way fast and secure.</p>
      <Link to="/articulos" className='button-articles'>Show Articles</Link>
    </div>
  )
}
