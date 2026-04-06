import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import CharacterCard from "./components/CharacterCard";

function App() {
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
  }, [listaFavoritos]);

  const añadirFavoritos = (personaje) => {
    if (!listaFavoritos.find((favorito) => favorito.id === personaje.id)) {
      setListaFavoritos([...listaFavoritos, personaje]);
    } else console.log("El personaje ya está en favoritos!");
  };

  const quitarFavoritos = (personaje) => {
    const listaFavoritosFiltrada = listaFavoritos.filter((favorito) => {
      return favorito.id !== personaje.id;
    });

    setListaFavoritos(listaFavoritosFiltrada);
  };

  const filtrarNombre = (event) => {
    setNombre(event.target.value);
  };

  const cambiarEstado = (event) => {
    setEstado(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-400">
        Rick & Morty Explorer
      </h1>

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

            {/* FAVORITOS */}
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
          </>
        )}
      </div>
    </div>
  );
}

export default App;