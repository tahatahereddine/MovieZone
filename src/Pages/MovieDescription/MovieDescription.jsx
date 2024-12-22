import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDescription.css";

function MovieDescription() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c4f01928bbe226995888eefb9969f80f`)
            .then((response) => response.json())
            .then((data) => {
                setMovie(data);
            });
    }, [id]);

    if (!movie) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="movie-desc-container">
            <h1>{movie.title}</h1>
            <p className="tagline">{movie.tagline}</p>
            <div className="movie-poster">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                    alt={movie.title}
                />
            </div>
            <div className="movie-details">
                <p className="overview">{movie.overview}</p>
                <div className="additional-details">
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {Number(movie.vote_average).toFixed(1)}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} mins</p>
                    <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
                    <p><strong>Production Companies:</strong> {movie.production_companies.map((c) => c.name).join(", ")}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieDescription;
