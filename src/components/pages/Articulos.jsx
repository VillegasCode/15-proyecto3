import React from 'react'
import { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Articulos = () => {

  // Creamos un hook useState con el objeto articulos y su configuración setArticulos
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Creamos un hook useEffect que cargue al inicio con los corchetes y lo cargamos con un array de objetos llamado data y se lo pasamos al hook setArticulos
  // useEffect(() => {
  //   let data = [
  //     {
  //       _id: 1,
  //       titulo: "Titulo 1",
  //       contenido: "Contenido"
  //     },
  //     {
  //       _id: 2,
  //       titulo: "Titulo 2",
  //       contenido: "Contenido 2"
  //     },
  //     {
  //       _id: 3,
  //       titulo: "Titulo 3",
  //       contenido: "Contenido 3"
  //     },
  //   ];

  //   setArticulos(data);
  // }, [])


  useEffect(() => {

    conseguirArticulos();
    
  }, [])

  const conseguirArticulos = async () => {
    
  const {datos, cargando} = await Peticion(Global.url+"articulos", "GET");
   
    
    // let peticion = await fetch(Global.url+"articulos", {
    //   method: "GET"
    // });
    // let datos = await peticion.json();
    
    //Para saber que props tiene el objeto datos
    console.log(datos);

    // Si la prop status del objeto datos es "success" entonces el useState setArticulos se cargará con .articulos del objeto datos
    if (datos.status == "success") {
      setArticulos(datos.articulos);
    }

    setCargando(false)
  }

// Cargamos desde el componente LISTADO con los 2 parámetros y lo recorremos con el método .map
  return (
    <>
    {
      cargando ? "Cargando..."
      :
      articulos.length >= 1 ? <Listado articulos = {articulos} setArticulos= {setArticulos}/>
                            : <h1>No hay artículos disponibles</h1>
    }
    </>
  )

}
