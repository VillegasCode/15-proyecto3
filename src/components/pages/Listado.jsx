import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';

var descripcion = 0;

export const Listado = ({ articulos, setArticulos }) => {
    const [leerMas, setLeerMas] = useState("mostrarBTN");  
    const eliminar = async (id) => {
        //alert(id);
        let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");

        if (datos.status === "success" || datos.status === "Success") {
            let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
            setArticulos(articulosActualizados);
        }
    }


    return (

        // {/* Creamos un objeto llamado articulo que contiene los datos recorridos por el array */ }
        articulos.map(articulo => {
            descripcion = JSON.stringify(articulo.contenido.length)
            return (

                // Creamos una key para react pueda identificar donde poner la información con los datos del array
                <article key={articulo._id} className="articulo-item">
                    <div className='mascara'>
                        {/* Si la  imagen es diferente a default.png entonces que cargue la imagen del api*/}
                        {articulo.imagen != "default.png" && <img src={Global.url + "imagen/" + articulo.imagen} />}
                        {/* Si la  imagen es igual a default.png entonces que cargue la imagen por defecto */}
                        {articulo.imagen == "default.png" && <img src='https://miro.medium.com/max/1400/1*k0SazfSJ-tPSBbt2WDYIyw.png' />}
                    </div>
                    <div className='datos'>
                        <h3 className="title"><Link to={"/articulo/" + articulo._id}>{articulo.titulo}</Link></h3>
                        <p className="description">{articulo.contenido.slice(0, 250)}...</p>
                       
                        {/* {descripcion > 250 ? setLeerMas("mostrarBTN") : setLeerMas("ocultarBTN")} */}
                        <Link to={"/articulo/" + articulo._id} className={leerMas} >(LEER MÁS)</Link><br></br>
                        {console.log("Nombre CLASE: " + leerMas)}
                        <Link to={"/editar/" + articulo._id} className='edit'>Edit</Link>

                        <button className="delete" onClick={() => {
                            eliminar(articulo._id)
                        }}>Delete</button>

                    </div>
                </article>

            );
            
        }
        )
    )

    // // let descripcion = JSON.stringify(articulo.contenido.length);
    // function contarDescripcion() {
    //     return (
    //         articulos.map(articulo => {
    //             let descripcion = JSON.stringify(articulo.contenido.length);
    //             if (descripcion > 250) {
    //                 setLeerMas("mostrarBTN");
    //                 console.log("Mayor a 250: " + descripcion + " status: " + leerMas);
    //             } else {
    //                 setLeerMas("ocultarBTN");
    //                 console.log("MENOR: " + descripcion + " status: " + leerMas);
    //             }
    //         })       
    //       )
    // }
}