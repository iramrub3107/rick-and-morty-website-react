import { useEffect, useState } from "react";

const URL_API = import.meta.env.VITE_URL_API;

export const useFetch = ({ pagina, nombre, estado }) => {
    //Añadimos las 3 variables que necesitamos
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch(URL_API + "/?page=" + pagina + "&name=" + nombre + "&status=" + estado);
                if (!response.ok) throw new Error("HA DADO ERROR LA API");
                const results = await response.json();
                setData(results.results);
                
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }   

        getData();
    }, [pagina, nombre, estado])

    

    return { data, loading, error };
}