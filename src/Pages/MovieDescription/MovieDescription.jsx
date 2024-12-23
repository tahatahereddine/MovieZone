import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MovieDescription.css";
import fallback from "../../images/fallback.png";

function MovieDescription() {
    const location = useLocation();
    const { item, type } = location.state || {}; // Destructure the passed state
    const [trailerKey, setTrailerKey] = useState(null);
    const [loadingTrailer, setLoadingTrailer] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false); // Controls trailer visibility

    useEffect(() => {
        if (type === "movie") {
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

            fetchTrailer();
        }
    }, [item.id, type]);

    const handleImageClick = () => {
        if (trailerKey) {
            setShowTrailer(true); // Show trailer when poster is clicked
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
            <p className="tagline">{item.tagline}</p>
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
                    <p className="overview">{item.overview}</p>
                    <div className="additional-details">
                        <p>
                            <strong>Release Date:</strong> {item.release_date || item.first_air_date}
                        </p>
                        <p>
                            <strong>Rating:</strong> {Number(item.vote_average).toFixed(1)}
                        </p>
                        {type === "movie" && item.runtime && (
                            <p>
                                <strong>Runtime:</strong> {item.runtime} mins
                            </p>
                        )}
                        {type === "series" && item.episode_run_time && (
                            <p>
                                <strong>Episode Runtime:</strong>{" "}
                                {item.episode_run_time[0]} mins
                            </p>
                        )}
                        <p>
                            <strong>Genres:</strong>{" "}
                            {item.genres?.map((g) => g.name).join(", ") || "N/A"}
                        </p>
                        <p>
                            <strong>Production Companies:</strong>{" "}
                            {item.production_companies
                                ?.map((c) => c.name)
                                .join(", ") || "N/A"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDescription;
