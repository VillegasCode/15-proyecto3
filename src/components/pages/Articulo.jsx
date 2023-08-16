import React from 'react'
import { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';
import { Listado } from './Listado';
import { useParams } from 'react-router-dom';

export const Articulo = () => {

  // Creamos un hook useState con el objeto articulo y su configuración setArticulo
  const [articulo, setArticulo] = useState([]);
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, [])

  const conseguirArticulo = async () => {

    const { datos, cargando } = await Peticion(Global.url + "articulo/" + params.id, "GET");

    // Si la prop status del objeto datos es "success" entonces el useState setArticulo se cargará con .articulo del objeto datos
    if (datos.status == "success") {
      setArticulo(datos.articulo);
    }

    setCargando(false)

    // Verificando que la petición sea la correcta y esté devolviendo datos
    console.log("CONSEGUIR ARTICULO: " + JSON.stringify(datos.articulo));
  }

  // Cargamos desde el componente LISTADO con los 2 parámetros y lo recorremos con el método .map
  return (
    <div className='jumbo'>
      {
        cargando ? "Cargando..." :
              <>
              <div className='mascara'>
                {/* Si la  imagen es diferente a default.png entonces que cargue la imagen del api*/}
                {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}

                {/* Si la  imagen es igual a default.png entonces que cargue la imagen por defecto */}
                {articulo.imagen == "default.png" && <img src='https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png' />}
              </div>
                <h1>{articulo.titulo}</h1>
                <span>{articulo.fecha}</span>
                <p>{articulo.contenido}</p>
              </>
              
      }
    </div>
  )

}
