import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Pagination from "../components/Pagination/Pagination";

function Home(props) {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1); // Start from page 1
    const [totalPages, setTotalPages] = useState(0);

    const API_KEY = import.meta.env.VITE_API_KEY;


    const fetchMovies = async (currentPage) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=${API_KEY}&page=${currentPage}`
        );
        const data = await res.json();
        return data;
    };

    useEffect(() => {
        const loadMovies = async () => {
            const data = await fetchMovies(page);
            setMovies(data.results);
            setTotalPages(500);
        };
        loadMovies();
    }, [page]);

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setPage(selectedPage);
    };

    console.log(movies);
    return (
        <>
            <MoviesList movies={movies} genre={{}}></MoviesList>
            <Pagination pageCount={totalPages} handlePageClick={handlePageClick}></Pagination>
        </>
    );
}

export default Home;
