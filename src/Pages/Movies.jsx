import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Pagination from "../components/Pagination/Pagination";

function Movies() {
    const [movies, setMovies] = useState(null);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); 
    const API_KEY = import.meta.env.VITE_API_KEY;
    ;
    const TOTAL_PAGES = 500;

    const fetchMoviesAndGenres = async (page) => {
        setLoading(true);
        setError(null);

        try {
            const [moviesResponse, genresResponse] = await Promise.all([
                fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc&include_adult=false&page=10`
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

    useEffect(() => {
        fetchMoviesAndGenres(currentPage);
    }, [currentPage]); // Refetch movies and genres when the page changes

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // Convert zero-based index to one-based page
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <div>Chargement des films...</div>;
    }

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!movies || !genre) {
        return <div>Aucun film trouvé</div>;
    }

    return (
        <>
            <MoviesList movies={movies} genre={genre} title="Movies" />
            <Pagination
                pageCount={TOTAL_PAGES}
                handlePageClick={handlePageClick}
                currentPage={currentPage - 1}
            />
        </>
    );
}

export default Movies;
