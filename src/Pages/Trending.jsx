import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';

function Trending() {
    const [movies, setMovies] = useState(null);
     const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

    useEffect(() => {
        const fetchMoviesAndGenres = async () => {
            setLoading(true);
            setError(null);

            const today = new Date();
            const maxDate = today.toISOString().split('T')[0];
            const minDateObj = new Date(today);
            minDateObj.setDate(today.getDate() - 30);
            const minDate = minDateObj.toISOString().split('T')[0];

            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                  fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}`
                  ),
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
                <h1>Chargement des films tendances...</h1>
        );
    }

    if (error) {
        return (
                <h1>Erreur: {error}</h1>
        );
    }

     if (!movies || !genre) {
        return (
                <h1>Aucun film tendance trouvé</h1>
        );
    }

    return (
           <MoviesList movies={movies} genre={genre} title="Trending Now" />
    );
}

export default Trending;
