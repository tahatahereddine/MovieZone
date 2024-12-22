import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import './ComingSoon.css';
import '../components/Card/Card.css';

function ComingSoon() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const minDate = today.toISOString().split('T')[0];

            const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${minDate}`;


            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.results && data.results.length > 0) {
                    setMovies(data.results);
                }  else if (data && data.results && data.results.length === 0) {
                    setMovies([]);
                }else{
                    setError("Aucun film à venir trouvé.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [API_KEY]);

    if (loading) {
        return (
            <div className="coming-soon">
                <h1>Chargement des films à venir...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="coming-soon">
                <h1>Erreur: {error}</h1>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="coming-soon">
                <h1>Aucun film à venir trouvé</h1>
            </div>
        )
    }

    return (
        <div className="coming-soon">
            <h1>Prochainement</h1>
            <div className="card-list">
                {movies &&
                    movies.map((movie) => (
                        <Card
                            key={movie.id}
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            title={movie.title}
                            release_date={movie.release_date}
                            rating={movie.vote_average}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default ComingSoon;
