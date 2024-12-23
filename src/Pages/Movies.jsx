import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";

function Movies() {
    const [movies, setMovies] = useState(null);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';
    useEffect(() => {
      const fetchMoviesAndGenres = async () => {
          setLoading(true);
          setError(null);
            try {
                const [moviesResponse, genresResponse] = await Promise.all([
                    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=2&sort_by=popularity.desc&include_adult=false`
                    ),
                    fetch(
                        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
                    ),
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
            return <div>Chargement des films...</div>;
        }

        if (error) {
            return <div>Erreur : {error}</div>;
        }
        if (!movies || !genre) {
        return <div>Aucun film trouvé</div>
        }


    return <MoviesList movies={movies} genre={genre} title="Movies" />;
}

export default Movies;
