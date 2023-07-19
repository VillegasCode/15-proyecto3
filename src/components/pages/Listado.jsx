import React from 'react'

export const Listado = ({articulos, setArticulos}) => {
    return (
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
}
