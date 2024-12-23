import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";

function Series() {
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

    useEffect(() => {
        const fetchSeries = async () => {
            setLoading(true);
            setError(null);


            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
                 );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                 const data = await response.json();

                if (data && data.results && data.results.length > 0) {
                        setSeries(data.results);
                    } else if (data && data.results && data.results.length === 0) {
                         setSeries([]);
                    }else {
                        setError("Aucune série trouvée.");
                    }


            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSeries();
    }, [API_KEY]);

  if (loading) {
        return (
          <div>Chargement des séries...</div>
        );
    }

    if (error) {
        return (
            <div>Erreur: {error}</div>
        );
    }

    if (!series || series.length === 0) {
        return (
            <div>Aucune série trouvée</div>
        )
    }

    return (
        <MoviesList movies={series} title="Series" />
    );
}

export default Series;
