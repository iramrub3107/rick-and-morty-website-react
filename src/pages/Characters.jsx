import React from 'react'
import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useCharacterFetch";
import CharacterCard from "../components/CharacterCard";
import { Link } from 'react-router-dom';

const Characters = () => {
  let [pagina, setPagina] = useState(1);
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("");
  const {
    data: personajes,
    loading,
    error,
  } = useFetch({ pagina, nombre, estado });

  const [listaFavoritos, setListaFavoritos] = useState(() => {
          const storageFavoritos = localStorage.getItem("listaFavoritos");
          if (storageFavoritos === null) {
            return [];
          } else return JSON.parse(storageFavoritos);
        });

  useEffect(() => {
    localStorage.setItem("listaFavoritos", JSON.stringify(listaFavoritos));
  }, [listaFavoritos])

  const añadirFavoritos = (personaje) => {
    if (!listaFavoritos.find((favorito) => favorito.id === personaje.id)) {
      setListaFavoritos([...listaFavoritos, personaje]);
      console.log(listaFavoritos);
    } else console.log("El personaje ya está en favoritos!");
  };

  const filtrarNombre = (event) => {
    setNombre(event.target.value);
  };

  const cambiarEstado = (event) => {
    setEstado(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h2 className="text-2xl font-semibold mb-4">Personajes</h2>

      {/* CONTROLES */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 bg-gray-800 p-4 rounded-2xl shadow">
        
        {/* Paginación */}
        <div className="flex items-center gap-3">
          {pagina !== 1 && (
            <button
              onClick={() => setPagina(pagina--)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition"
            >
              ⬅ Anterior
            </button>
          )}

          {pagina < 42 && (
            <button
              onClick={() => setPagina(pagina++)}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-xl transition"
            >
              Siguiente ➡
            </button>
          )}

          <p className="text-sm text-gray-300">Página {pagina}</p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar personaje..."
            value={nombre}
            onChange={filtrarNombre}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-green-400 w-full"
          />

          <select
            value={estado}
            onChange={cambiarEstado}
            className="bg-gray-700 text-white px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todos</option>
            <option value="alive">🟢 Vivo</option>
            <option value="dead">🔴 Muerto</option>
            <option value="unknown">⚪ Desconocido</option>
          </select>
        </div>
      </div>

      {/* CONTENIDO */}
      <div id="catalogo-container">
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
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {personajes.map((personaje) => {
                return (
                  <CharacterCard
                    key={personaje.id}
                    personaje={personaje}
                    nombre={personaje.name}
                    especie={personaje.species}
                    imagen={personaje.image}
                    clicFavoritos={añadirFavoritos}
                    textoBoton={"Añadir a favoritos"}
                  />
                );
              })}
            </ul>

           
          </>
        )}
      </div>
    </div>
  );
}

export default Characters