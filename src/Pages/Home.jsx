import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Pagination from "../components/Pagination/Pagination";

function Home() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1); // Start from page 1
    const [totalPages, setTotalPages] = useState(0);

    const fetchMovies = async (currentPage) => {
        const res = await fetch(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&api_key=1de54ccbfea3c2dcfeffd0338867c3b5&page=${currentPage}`
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
    }, [page]); // Refetch movies when the page changes

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // Adjust for zero-based index
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
