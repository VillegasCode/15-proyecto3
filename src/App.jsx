import { useState } from 'react'
import { Articulos } from './components/pages/Articulos'
import { Inicio } from './components/pages/Inicio'
import { Crear } from './components/pages/Crear'
import { Rutas } from './routing/Rutas'

function App() {
  
  return (
    <div className='layout'>
      <h1>Blog con React</h1>
      <Rutas/>
    </div>
  )
}

export default App
