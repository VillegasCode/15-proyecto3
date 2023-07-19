import React from 'react'

export const Crear = () => {
  return (
    <div className='jumbo'>
      <h1>Crear Artículo</h1>
      <p>Formulario para crear artículo</p>

      {/* Montar formulario */}
      <form className='formulario'>

        <div className='form-group'>
          <label htmlFor="titulo">TÍTULO</label>
          <input type='text' name='titulo' />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">CONTENIDO</label>
          <textarea type='text' name='contenido' />
        </div>

        <div className='form-group'>
          <label htmlFor="file0">IMAGEN</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>


    </div>
  )
}
