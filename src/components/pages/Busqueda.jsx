import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';

export const Busqueda = () => {

  // Creamos un hook useState con el objeto articulos y su configuración setArticulos
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();
  
  useEffect(() => {
    conseguirArticulos();
  }, []);

  useEffect(() => {
    conseguirArticulos();
  }, [params]);


  const conseguirArticulos = async () => {
    
  const {datos, cargando} = await Peticion(Global.url + "buscar/" + params.busqueda, "GET");
   
    
    // let peticion = await fetch(Global.url+"articulos", {
    //   method: "GET"
    // });
    // let datos = await peticion.json();
    
    //Para saber que props tiene el objeto datos
    console.log(datos);

    // Si la prop status del objeto datos es "success" entonces el useState setArticulos se cargará con .articulos del objeto datos
    if (datos.status == "Success" || datos.status == "success") {
      setArticulos(datos.articulos);
    } else {
      setArticulos([]);
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
