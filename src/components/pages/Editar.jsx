import React from 'react';
import { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from '../../helpers/Global';
import { useParams } from 'react-router-dom';
var datosCopiar;


export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [noFormato, setnoFormato] = useState("");
  const [articulo, setArticulo] = useState({});
  const params = useParams();
  const [disable, setDisable] = useState(false);
  const [disableEditar, setDisableEditar] = useState(true);
  const [valor, setValor] = useState("SAVE");
  const [clasebtnGuardar, setClaseBtnGuardar] = useState("btn btn-success");
  const [clasebtnEditar, setClaseBtnEditar] = useState("btn btn-editar");
  const [btnEditarHidden, setbtnEditarHidden] = useState(true);

  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "GET");
    console.log("CONSEGUIR ARTÍCULO PARA EDITAR: " + JSON.stringify(datos.articulo));
    console.log("Estado de obtención de los datos: " + datos.status);
    if (datos.status === "success") {
      setArticulo(datos.articulo);
      datosCopiar = datos.articulo;
      console.log("DATOS COPIAR: " + datosCopiar);
    }
    console.log("Form al cargar: " + JSON.stringify(formulario));
  }

  const bntEditarFunction = (e) => {
    e.preventDefault();

    setValor("SAVE");
    setDisable(false);
    setClaseBtnGuardar("btn btn-success");
    setbtnEditarHidden(true);
    setResultado("no_enviado");
    setnoFormato("");
  }

  const editarArticulo = async (e) => {
    e.preventDefault();
    console.log(datosCopiar);
    //Recoger datos formulario
    console.log(formulario);
    let nuevoArticulo = formulario;
    //SI FORMULARIO ESTÁ VACÍO ENTONCES ASIGNAR LOS VALUES A CADA CAMPO DEL FORMULARIO PARA QUE ESTÉN LLENOS
    console.log("Nuevo Artíclo editado: " + JSON.stringify(nuevoArticulo));

    if (Object.keys(nuevoArticulo).length === 0) {
      nuevoArticulo = datosCopiar;
      console.log("Llenado por defecto: " + JSON.stringify(nuevoArticulo));
    } else if (nuevoArticulo.titulo == null) {
      nuevoArticulo.titulo = articulo.titulo;
    } else if (nuevoArticulo.contenido == null) {
      nuevoArticulo.contenido = articulo.contenido;
    } else if (nuevoArticulo.imagen == null) {
      nuevoArticulo.imagen = articulo.imagen;
      console.log("IMAGEN: " + nuevoArticulo.imagen);
    }

    //Guardar articulo en el backend
    const { datos } = await Peticion(Global.url + "articulo/" + params.id, "PUT", nuevoArticulo);
    console.log("ESTATUS ACTUAL del cambio del titulo y contenido: " + JSON.stringify(datos));
    console.log("ESTATUS CONTENIDO: " + datos.status);
    if (datos.status === "success" || datos.status === "Success") {
      setResultado("guardado");
      setValor("SAVED");
      setDisable(true);
      setDisableEditar(false);
      setClaseBtnGuardar("btn btn-disabled");
      setClaseBtnEditar("btn btn-editar-habilitado");
      setbtnEditarHidden(false);
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
        // deshabilitar();
        console.log("SUBIDA EXITOSA");
      } else {
        // deshabilitar();

        setResultado("error");
        setnoFormato("error");
        console.log("SUBIDA ERRÓNEA: " + resultado + " Se subió y asignó una imagen por defecto");
      }
    } else {
      // deshabilitar();
      setnoFormato("error");
      console.log("No se subió ninguna imagen");
    }
  }

  return (
    <div className='jumbo'>
      <h1>Edit Article</h1>
      <p>Form to Edit: {articulo.titulo}</p>
      {/* <pre>{JSON.stringify(formulario)}</pre> */}

      {/* Montar formulario */}
      <form className='formulario' onSubmit={editarArticulo}>

        <div className='form-group'>
          <label htmlFor="titulo">TÍTULO</label>
          <input type='text' name='titulo' onChange={cambiado} defaultValue={articulo.titulo} />
        </div>

        <div className='form-group'>
          <label htmlFor="contenido">CONTENIDO</label>
          <textarea type='text' name='contenido' onChange={cambiado} defaultValue={articulo.contenido} />
          {console.log("Valor de Formulario Cambiado: " + JSON.stringify(formulario))}
        </div>

        <div className='form-group'>
          <label htmlFor="file0">IMAGEN</label>
          <div className='mascara'>
            {/* Si la  imagen es diferente a default.png entonces que cargue la imagen del api*/}
            {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}

            {/* Si la  imagen es igual a default.png entonces que cargue la imagen por defecto */}
            {articulo.imagen == "default.png" && <img src='https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png' />}
          </div>
          <input type='file' name='file0' id='file' />
        </div>

        <input id='btnGuardar' type='submit' value={valor} className={clasebtnGuardar} disabled={disable} /><br/>
        <input id='btnEditar' onClick={bntEditarFunction} type='button' value={"EDIT"} className={clasebtnEditar} hidden={btnEditarHidden} disabled={disableEditar} />
        <pre>
          <strong>{resultado == "guardado" ? "Artículo guardado con éxito!! " : ""}</strong>
          {console.log("RESULTADO: " + resultado)}
          <strong>{resultado == "error" ? "Los datos proporcionados son incorrectos " : ""}</strong>
          <strong>{noFormato == "" ? "" : "No se modificó la imagen"}</strong>
          <strong>{resultado == "no_enviado" ? "" : ""}</strong>
        </pre>

      </form>


    </div>
  )
}