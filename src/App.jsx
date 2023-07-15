import { useState } from 'react'
import { Articulos } from './components/pages/Articulos'
import { Inicio } from './components/pages/Inicio'
import { Crear } from './components/pages/Crear'

function App() {
  
  return (
    <div>
      <h1>Blog con React</h1>
      <Inicio />
      <Articulos />
      <Crear />
    </div>
  )
}

export default App
