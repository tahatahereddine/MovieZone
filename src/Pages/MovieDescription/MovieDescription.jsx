import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MovieDescription.css";
import fallback from "../../images/fallback.png";
import { Link } from "react-router-dom";

function MovieDescription() {
    const genres = [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
        { id: 16, name: "Animation" },
        { id: 35, name: "Comedy" },
        { id: 80, name: "Crime" },
        { id: 99, name: "Documentary" },
        { id: 18, name: "Drama" },
        { id: 10751, name: "Family" },
        { id: 14, name: "Fantasy" },
        { id: 36, name: "History" },
        { id: 27, name: "Horror" },
        { id: 10402, name: "Music" },
        { id: 9648, name: "Mystery" },
        { id: 10749, name: "Romance" },
        { id: 878, name: "Science Fiction" },
        { id: 10770, name: "TV Movie" },
        { id: 53, name: "Thriller" },
        { id: 10752, name: "War" },
        { id: 37, name: "Western" },
    ];

    const getGenreNames = (ids) => {
        return ids
            .map((id) => {
                const genre = genres.find((genre) => genre.id === id);
                return genre ? genre.name : "";
            })
            .filter((name) => name) 
            .join(", ");
    };

    const location = useLocation();
    const { item, type } = location.state || {}; // Destructure the passed state
    const [trailerKey, setTrailerKey] = useState(null);
    const [loadingTrailer, setLoadingTrailer] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false); // Controls trailer visibility
    const [productionCompanies, setProductionCompanies] = useState([]); // State for production companies

    useEffect(() => {
        if (type === "movie") {
            // Fetch trailer
            const fetchTrailer = async () => {
                setLoadingTrailer(true);
                try {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=1de54ccbfea3c2dcfeffd0338867c3b5`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        const trailer = data.results.find(
                            (video) =>
                                video.type === "Trailer" && video.site === "YouTube"
                        );
                        setTrailerKey(trailer ? trailer.key : null);
                    }
                } catch (error) {
                    console.error("Failed to fetch trailer:", error);
                } finally {
                    setLoadingTrailer(false);
                }
            };

            // Fetch production companies
            const fetchProductionCompanies = async () => {
                try {
                    const response = await fetch(
                        `https://api.themoviedb.org/3/movie/${item.id}?api_key=1de54ccbfea3c2dcfeffd0338867c3b5`
                    );

                    if (response.ok) {
                        const data = await response.json();

                        const companies = data.production_companies
                            ?.map((company) => ({
                                id: company.id || "unknown",
                                name: company.name || "Unnamed Company",
                            }))
                            .filter(
                                (company, index, self) =>
                                    self.findIndex((c) => c.name === company.name) === index
                            ) || [];

                         setProductionCompanies(companies);
                         console.log(data.production_companies);
                        // Update tagline
                        item.tagline = data.tagline || "No tagline available";
                    }
                } catch (error) {
                    console.error("Failed to fetch production companies:", error);
                    setProductionCompanies([]); // Default to empty array on error
                }
            };

            fetchTrailer();
            fetchProductionCompanies();
        }
    }, [item.id, type]);

    const handleImageClick = () => {
        if (trailerKey) {
            setShowTrailer(true);
        }
    };

    if (!item) {
        return <div className="loading">No details available.</div>;
    }

    const youtubeUrl = trailerKey
        ? `https://www.youtube.com/embed/${trailerKey}`
        : null;

    return (
        <div className="movie-desc-container">
            <h1>{item.title || item.name}</h1>
            <p className="tagline">{item.tagline || ""}</p>
            <div
                className={`movie-header ${
                    showTrailer ? "movie-header-trailer" : ""
                }`}
            >
                <div
                    style={{
                        width: showTrailer ? "100%" : "120%",
                        marginRight: showTrailer ? 0 : "20px",
                    }}
                >
                    {!showTrailer && (
                        <div
                            className="movie-poster"
                            onClick={handleImageClick}
                            style={{ cursor: trailerKey ? "pointer" : "default" }}
                        >
                            <img
                                src={
                                    item.poster_path
                                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                                        : fallback
                                }
                                alt={item.title || item.name}
                            />
                        </div>
                    )}
                    {showTrailer && youtubeUrl && (
                        <div className="video-container">
                            <iframe
                                width="100%"
                                height="315"
                                src={youtubeUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                    {showTrailer && !youtubeUrl && (
                        <p>No trailer available.</p>
                    )}
                </div>
                <div className="movie-details">
                    <p className="overview">{item.overview || "No description available."}</p>
                    <div className="additional-details">
                        <p>
                            <strong>Release Date:</strong>{" "}
                            {item.release_date || item.first_air_date || "N/A"}
                        </p>
                        <p>
                            <strong>Rating:</strong>{" "}
                            {Number(item.vote_average).toFixed(1) || "N/A"}
                        </p>
                        {type === "movie" && item.runtime && (
                            <p>
                                <strong>Runtime:</strong> {item.runtime} mins
                            </p>
                        )}
                        {type === "series" && item.episode_run_time?.length && (
                            <p>
                                <strong>Episode Runtime:</strong>{" "}
                                {item.episode_run_time[0]} mins
                            </p>
                        )}
                        <p>
                            <strong>Genres:</strong>{" "}
                            {getGenreNames(item.genre_ids)}
                        </p>
                        <p>
                            <strong>Production Companies:</strong>{" "}
                            {productionCompanies.length > 0 ? (
                                productionCompanies.map((company, index) => (
                                    <React.Fragment key={company.id}>
                                        <Link
                                            to={`/company/${company.id}`}
                                            style={{ color: "#007bff", textDecoration: "none" }}
                                        >
                                            {company.name}
                                        </Link>
                                        {index < productionCompanies.length - 1 && ", "}
                                    </React.Fragment>
                                ))
                            ) : (
                                "N/A"
                            )}
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDescription;
