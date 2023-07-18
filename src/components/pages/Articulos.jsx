import React from 'react'
import { useEffect, useState } from 'react'
import { Global } from '../../helpers/Global';

export const Articulos = () => {

  // Creamos un hook useState con el objeto articulos y su configuración setArticulos
  const [articulos, setArticulos] = useState([]);

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
    const url = Global.url + "articulos";
    let peticion = await fetch(url, {
      method: "GET"
    });
    let datos = await peticion.json();

    //Para saber que props tiene el objeto datos
    console.log(datos);

    // Si la prop status del objeto datos es "success" entonces el useState setArticulos se cargará con .articulos del objeto datos
    if (datos.status == "success") {
      setArticulos(datos.articulos);
    }
  }


  // El objeto articulos del hook ya cargado con el array lo recorremos con el método .map
  return (
    <>
      {
        articulos.length >= 1 ? (
          // {/* Creamos un objeto llamado articulo que contiene los datos recorridos por el array */ }
          articulos.map(articulo => {
            return (
              // Creamos una key para react pueda identificar donde poner la información con los datos del array
              <article key={articulo._id} className="articulo-item">
                <div className='mascara'>
                  <img src='https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png'></img>
                </div>
                <div className='datos'>
                  <h3 className="title">{articulo.titulo}</h3>
                  <p className="description">{articulo.contenido}</p>

                  <button className="edit">Editar</button>
                  <button className="delete">Borrar</button>

                </div>
              </article>
            );
          })
        )
          :
          (
            <h1>No hay artículos disponibles</h1>
          )
      }
    </>
  )

}
