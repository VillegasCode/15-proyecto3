import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Global } from '../../helpers/Global';
import { Peticion } from '../../helpers/Peticion';


export const Listado = ({ articulos, setArticulos }) => {

    const [leerMas,setLeerMas] = useState(true);
    // if (JSON.parseInt(articulo.contenido) > 250) {
    //         setLeerMas = false;
    // }

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
                        <Link id="readMoreButton" to={"/articulo/" + articulo._id} hidden={leerMas}>(LEER MÁS)</Link><br></br>
                   

                        <Link to={"/editar/" + articulo._id} className='edit'>Edit</Link>

                        <button className="delete" onClick={() => {
                            eliminar(articulo._id)
                        }}>Delete</button>

                    </div>
                </article>

            );

        })
    )
}