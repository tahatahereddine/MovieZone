import React, { useState, useEffect } from "react";
import MoviesList from "../components/MoviesList/MoviesList";
import Pagination from "../components/Pagination/Pagination";

function Documentaries() {
    const [documentaries, setDocumentaries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Tracks the current page
    const API_KEY = import.meta.env.VITE_API_KEY;
    const TOTAL_PAGES = 300; // Assuming 100 pages for documentaries

    const fetchDocumentaries = async (page) => {
        setLoading(true);
        setError(null);

        const today = new Date();
        const minDateObj = new Date(today);
        minDateObj.setDate(today.getDate() - 365); // 1 year
        const minDate = minDateObj.toISOString().split('T')[0];

        const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=99&primary_release_date.gte=${minDate}`;

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data && data.results && data.results.length > 0) {
                setDocumentaries(data.results);
            } else if (data && data.results && data.results.length === 0) {
                setDocumentaries([]);
            } else {
                setError("Aucun documentaire trouvé.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocumentaries(currentPage);
    }, [currentPage]); // Refetch documentaries when the page changes

    const handlePageClick = (data) => {
        const selectedPage = data.selected + 1; // Convert zero-based index to one-based page
        setCurrentPage(selectedPage);
    };

    if (loading) {
        return <div>Chargement des documentaires...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }

    if (!documentaries || documentaries.length === 0) {
        return <div>Aucun documentaire trouvé</div>;
    }

    return (
        <>
            <MoviesList
                movies={documentaries}
                title="Documentaries"
                genre={[{ id: 99, name: "Documentary" }]}
            />
            <Pagination
                pageCount={TOTAL_PAGES}
                handlePageClick={handlePageClick}
                currentPage={currentPage - 1} // Adjust for zero-based index
            />
        </>
    );
}

export default Documentaries;
