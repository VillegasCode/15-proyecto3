import React from 'react';
import {useState} from "react";
import {useForm} from "../../hooks/useForm";

export const Crear = () => {

  const {formulario, enviado, cambiado} = useForm({});

  const guardarArticulo = (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = JSON.stringify(formulario);
    console.log(nuevoArticulo)

    //Guardar articulo en el backend
    
  }

  return (
    <div className='jumbo'>
      <h1>Crear Artículo</h1>
      <p>Formulario para crear artículo</p>
      <pre>{JSON.stringify(formulario)}</pre>

      {/* Montar formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">TÍTULO</label>
          <input type='text' name='titulo' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">CONTENIDO</label>
          <textarea type='text' name='contenido' onChange={cambiado} />
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
