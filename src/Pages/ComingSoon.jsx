import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';

function ComingSoon() {
    const [movies, setMovies] = useState(null);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5'; // ou utilise `process.env.REACT_APP_API_TOKEN` si tu utilise les variables d'environnement

    useEffect(() => {
        const fetchMoviesAndGenres = async () => {
            setLoading(true);
            setError(null);

             const today = new Date();
            const minDate = today.toISOString().split('T')[0];
            const maxDateObj = new Date(today);
            maxDateObj.setDate(today.getDate() + 180);
            const maxDate = maxDateObj.toISOString().split('T')[0];


            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}`),
                  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
                ]);

                 if (!moviesResponse.ok) {
                    throw new Error(`HTTP error! Status: ${moviesResponse.status}`);
                }
                 if (!genresResponse.ok) {
                    throw new Error(`HTTP error! Status: ${genresResponse.status}`);
                }

                const moviesData = await moviesResponse.json();
                 const genresData = await genresResponse.json();

                 setMovies(moviesData.results);
                 setGenre(genresData.genres);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMoviesAndGenres();
    }, [API_KEY]);

   if (loading) {
        return (
            <div>Chargement des films à venir...</div>
        );
    }

    if (error) {
        return (
            <div>Erreur: {error}</div>
        );
    }

    if (!movies || !genre ) {
        return (
            <div>Aucun film à venir trouvé</div>
        )
    }
    
    return (
        <MoviesList movies={movies} genre={genre} title="Coming Soon !" />
    );
}

export default ComingSoon;
