import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import '../components/Card/Card.css';
import './Trending.css';

function Trending() {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const maxDate = today.toISOString().split('T')[0];
            const minDateObj = new Date(today);
            minDateObj.setDate(today.getDate() - 30);
            const minDate = minDateObj.toISOString().split('T')[0];

            const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (data && data.results && data.results.length > 0) {
                    setMovies(data.results);
                } else if (data && data.results && data.results.length === 0) {
                    setMovies([]);
                } else {
                    setError("Aucun film tendance trouvé.");
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
            <div className="trending">
                <h1>Chargement des films tendances...</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="trending">
                <h1>Erreur: {error}</h1>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="trending">
                <h1>Aucun film tendance trouvé</h1>
            </div>
        );
    }

    return (
        <div className="trending">
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

export default Trending;
