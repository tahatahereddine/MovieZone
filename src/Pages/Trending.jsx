import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';
import Pagination from '../components/Pagination/Pagination';

function Trending() {
    const [movies, setMovies] = useState(null);
    const [genre, setGenre] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const TOTAL_PAGES = 150;

    const fetchMoviesAndGenres = async (page) => {
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
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}`
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

    useEffect(() => {
        fetchMoviesAndGenres(currentPage);
    }, [currentPage]);

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // Convert zero-based index to one-based page
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <h1>Chargement des films tendances...</h1>;
    }

    if (error) {
        return <h1>Erreur: {error}</h1>;
    }

    if (!movies || !genre) {
        return <h1>Aucun film tendance trouvé</h1>;
    }

    return (
        <>
            <MoviesList movies={movies} genre={genre} title="Trending Now" />
            <Pagination
                pageCount={TOTAL_PAGES}
                handlePageClick={handlePageClick}
                currentPage={currentPage - 1} // Adjust for zero-based index
            />
        </>
    );
}

export default Trending;
