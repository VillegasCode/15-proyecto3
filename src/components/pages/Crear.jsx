import React from 'react';
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from '../../helpers/Global';


export const Crear = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [noFormato, setnoFormato] = useState("");


  const guardarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;
    console.log(nuevoArticulo);

    //Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);
    console.log("DATOS: " + JSON.stringify(datos));

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
      console.log("DATOS STATUS ERRONEO: " + resultado);
    }

    //Subir imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);
      console.log("ESTADO SUBIDA: " + subida.datos.status);
      if (subida.datos.status === "Success") {
        setResultado("guardado");
        setnoFormato("");
        console.log("SUBIDA EXITOSA: " + resultado);
      } else {
        setResultado("error");
        setnoFormato("error");
        console.log("SUBIDA ERRÓNEA: " + resultado + " Se subió y asignó una imagen por defecto");
      }
    } else {
      setnoFormato("error");
      console.log("No se subió ninguna imagen");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Create Articles</h1>
      <p>Form to create an article</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}
      <pre>
        <strong>{resultado == "guardado" ? "Successfully saved article!! " : ""}</strong>
        <strong>{resultado == "error" ? "The data provided is incorrect" : ""}</strong>
        <strong>{noFormato == "" ? "" : "A default image was assigned"}</strong>
        </pre>
      
      {/* Montar formulario */}
      <form className='formulario' onSubmit={guardarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">TITLE</label>
          <input type='text' name='titulo' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">CONTENT</label>
          <textarea type='text' name='contenido' onChange={cambiado} />
        </div>

        <div className='form-group'>
          <label htmlFor="file0">IMAGE</label>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value="SAVE" className='btn btn-success' />

      </form>


    </div>
  )
}