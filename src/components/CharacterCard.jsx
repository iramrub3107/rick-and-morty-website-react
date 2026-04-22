import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CharacterDetails from '../pages/CharacterDetails'

const CharacterCard = ({ nombre, especie, imagen, personaje, clicFavoritos, textoBoton }) => {
  // let textoBoton = "Añadir a favoritos";
  const { id } = personaje

  const [mostrarDetalles, setMostrarDetalles] = useState(false)

  const verDetalles = () => {
    console.log(mostrarDetalles);
    setMostrarDetalles(true);
    if (mostrarDetalles) setMostrarDetalles(false);
  }
  return (
    <li className="bg-gray-800 rounded-2xl shadow-lg p-4 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
        <img 
          src={imagen} 
          alt={nombre}
          className="w-32 h-32 object-cover rounded-full border-4 border-green-400 mb-4"
        />

        <h1 className="text-lg font-bold">{nombre}</h1>
        <h3 className="text-sm text-gray-400 mb-4">{especie}</h3>
        <h3 className="text-sm text-gray-400 mb-4">{personaje.status}</h3>

        <button onClick={() => clicFavoritos(personaje)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition">
          {textoBoton}
        </button>
        <br />
        {/* Esta es la ruta absoluta. Hay que tener cuidado con cómo la pones (la ruta, claro ;) ) */}
        <button onClick={() => verDetalles()} className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-xl transition">Ver detalles</button>
        {
          mostrarDetalles && 
          (
          <div>
            <ul>
              {
                personaje.episode.map((episodio, index) => {
                  return <li key={index}>{episodio}</li>
                })
              }
            </ul>
          </div>
          )
        }
        <Link to={`/characters/${id}`} className="bg-green-900 hover:bg-green-900 text-white px-4 py-2 rounded-xl transition">Ver detalles</Link>          
    </li>
  )
}

export default CharacterCard