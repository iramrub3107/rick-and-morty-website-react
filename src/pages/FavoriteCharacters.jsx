import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

const FavoriteCharacters = () => {
    const [listaFavoritos, setListaFavoritos] = useState(() => {
        const storageFavoritos = localStorage.getItem("listaFavoritos");
        if (storageFavoritos === null) {
          return [];
        } else return JSON.parse(storageFavoritos);
      });

    useEffect(() => {
        localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
    }, [listaFavoritos]);

    const quitarFavoritos = (personaje) => {
        const listaFavoritosFiltrada = listaFavoritos.filter((favorito) => {
        return favorito.id !== personaje.id;
        });

        setListaFavoritos(listaFavoritosFiltrada);
    };

  return (
    <div>

        
            {/* VER CONTEXTO FAVORITOS */}


            <h2 className="text-2xl font-semibold mt-10 mb-4 text-yellow-400">
                ⭐ Mis Favoritos
            </h2>
    
            <div
                id="favoritos-container"
                className="bg-gray-800 p-4 rounded-2xl shadow"
            >
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {listaFavoritos.map((personaje) => {
                  return (
                    <CharacterCard
                      key={personaje.id}
                      personaje={personaje}
                      nombre={personaje.name}
                      especie={personaje.species}
                      imagen={personaje.image}
                      clicFavoritos={quitarFavoritos}
                      textoBoton={"Quitar de favoritos"}
                    />
                  );
                })}
              </ul>
            </div>
            
            <Link to={"/characters"}>Volver a los personajes</Link>
    </div>
  )
}

export default FavoriteCharacters