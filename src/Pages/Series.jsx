import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Pagination from "../components/Pagination/Pagination";

function Series() {
    const [series, setSeries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const API_KEY = import.meta.env.VITE_API_KEY;
    const TOTAL_PAGES = 100; 

    const fetchSeries = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=${page}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data && data.results && data.results.length > 0) {
                setSeries(data.results);
            } else if (data && data.results && data.results.length === 0) {
                setSeries([]);
            } else {
                setError("Aucune série trouvée.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeries(currentPage);
    }, [currentPage]); 

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <div>Chargement des séries...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!series || series.length === 0) {
        return <div>Aucune série trouvée</div>;
    }

    return (
        <>
            <MoviesList movies={[]} series={series} title="Series" />
            <Pagination
                pageCount={TOTAL_PAGES}
                handlePageClick={handlePageClick}
                currentPage={currentPage - 1}
            />
        </>
    );
}

export default Series;
