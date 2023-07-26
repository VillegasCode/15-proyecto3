import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from '../../helpers/Global';
import { useParams } from  'react-router-dom';


export const Editar = () => {

  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [noFormato, setnoFormato] = useState("");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");
    console.log("CONSEGUIR ARTÍCULO PARA EDITAR: " + JSON.stringify(datos.articulo));
    console.log("Estado de obtención de los datos: " + datos.status);
    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
//datos.articulo.titulo
//datos.articulo.contenido
  }

  const editarArticulo = async (e) => {
    e.preventDefault();

    //Recoger datos formulario
    let nuevoArticulo = formulario;
    //SI FORMULARIO ESTÁ VACÍO ENTONCES ASIGNAR LOS VALUES A CADA CAMPO DEL FORMULARIO PARA QUE ESTÉN LLENOS
    console.log("Nuevo Artículo editado: " + JSON.stringify(nuevoArticulo));

    //Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);
    console.log("ESTATUS ACTUAL del cambio del titulo y contenido: " + JSON.stringify(datos));
    console.log("ESTATUS CONTENIDO: " + datos.status);
    if (datos.status === "success" || datos.status === "Success") {
      setResultado("guardado");
    } else {
      setResultado("error");
      console.log("DATOS STATUS ERRONEO: " + resultado);
    }

    //Subir imagen
    const fileInput = document.querySelector("#file");

    if (datos.status === "success" || datos.status === "Success" && fileInput.files[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput.files[0]);

      console.log("ID de ARTICULO: " + datos.articulo._id);

      const subida = await Peticion(Global.url + "subir-imagen/" + datos.articulo._id, "POST", formData, true);
      console.log("ESTADO SUBIDA: " + subida.datos.status);
      if (subida.datos.status === "Success") {
        setResultado("guardado");
        setnoFormato("");
        console.log("SUBIDA EXITOSA");
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
      <h1>Editar Artículo</h1>
      <p>Formulario para Editar: {articulo.titulo}</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}
      <pre>
        <strong>{resultado == "guardado" ? "Articulos guardado con éxito!! " : ""}</strong>
        <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos " : ""}</strong>
        <strong>{noFormato == "" ? "" : "Se asignó una imagen por defecto"}</strong>
        </pre>
      
      {/* Montar formulario */}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">TÍTULO</label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">CONTENIDO</label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido}/>
        </div>

        <div className='form-group'>
          <label htmlFor="file0">IMAGEN</label>
          <div className='mascara'>
                {/* Si la  imagen es diferente a default.png entonces que cargue la imagen del api*/}
                {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
  {console.log("Articulo de Imagen: " + articulo.imagen)}
                {/* Si la  imagen es igual a default.png entonces que cargue la imagen por defecto */}
                {articulo.imagen == "default.png" && <img src='https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png' />}
              </div>
          <input type='file' name='file0' id='file' />
        </div>

        <input type='submit' value="Guardar" className='btn btn-success' />

      </form>


    </div>
  )
}