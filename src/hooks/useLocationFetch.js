import React, { useEffect, useState } from 'react'

const URL_API = import.meta.env.VITE_URL_API_LOCATIONS;

export const useLocationFetch = ({ enlace }) => {
    //Añadimos las 3 variables que necesitamos
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const getData = async() => {
            try {
                const response = await fetch(enlace);
                if (!response.ok) throw new Error("HA DADO ERROR LA API");
                console.log(response);
                const results = await response.json();
                console.log(results);
                setData(results.results);
                    
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }   
    
        getData();
    }, [enlace])
    
  return { data, loading, error }
}