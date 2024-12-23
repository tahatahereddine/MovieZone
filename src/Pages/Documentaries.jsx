import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";

function Documentaries() {
    const [documentaries, setDocumentaries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

    useEffect(() => {
        const fetchDocumentaries = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const minDateObj = new Date(today);
            minDateObj.setDate(today.getDate() - 365); //1 an
            const minDate = minDateObj.toISOString().split('T')[0];


           const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=99&primary_release_date.gte=${minDate}`;


            try {
                const response = await fetch(apiUrl);

                 if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                 if (data && data.results && data.results.length > 0) {
                        setDocumentaries(data.results);
                    } else if (data && data.results && data.results.length === 0) {
                        setDocumentaries([]);
                    }else {
                        setError("Aucun film à venir trouvé.");
                    }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDocumentaries();
    }, [API_KEY]);

   if (loading) {
        return (
            <div>Chargement des documentaires...</div>
        );
    }

    if (error) {
        return (
           <div>Erreur: {error}</div>
        );
    }

    if (!documentaries || documentaries.length === 0) {
        return (
            <div>Aucun documentaire trouvé</div>
        );
    }

    return (
         <MoviesList movies={documentaries} title="Documentaries" genre={[{id: 99, name:"Documentary"}]} />
    );
}

export default Documentaries;
