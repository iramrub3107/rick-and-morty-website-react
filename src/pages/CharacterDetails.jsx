import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLocationFetch } from '../hooks/useLocationFetch';

const URL_API = import.meta.env.VITE_URL_API;

const CharacterDetails = ({  }) => {
  const { id } = useParams();

  const [personaje, setPersonaje] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const getDataById = async() => {
        try {
            const response = await fetch(URL_API + "/" + id);
            if (!response.ok) throw new Error("HA DADO ERROR LA API");
            const results = await response.json();
            setPersonaje(results);        
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    getDataById();
  }, [id])

  const {
      data: location,
      loading: locationLoading,
      error: locationError,
    } = useLocationFetch("https://rickandmortyapi.com/api/location/3");
    
  return (
    <div>

      <h1>{personaje.name}</h1>
      {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-green-400"></div>
          </div>
        ) : error !== null ? (
          <h1 className="text-red-400 text-center py-6">
            ⚠ ERROR: {error}
          </h1>
        ) : (
          <>
            <img 
            src={personaje.image} 
            alt={personaje.name}
            className="w-32 h-32 object-cover rounded-full border-4 border-green-400 mb-4"
            />
      
            <h3 className="text-sm text-gray-400 mb-4">{personaje.species}</h3>
            <h3 className="text-sm text-gray-400 mb-4">{personaje.status}</h3>

            <hr />

            <div>
              <h1>Origen</h1>
              <p>{location.name}</p>
            </div>

            <Link to={"/characters"}>Volver a los personajes</Link>
          </>
        )
      }
    </div>
  )
}

export default CharacterDetails