import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./MovieDescription.css";

function MovieDescription() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        const fetchMovieData = async () => {
          setLoading(true);
           setError(null);
            try {
                const [movieResponse, videosResponse] = await Promise.all([
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}?api_key=1de54ccbfea3c2dcfeffd0338867c3b5`
                    ),
                    fetch(
                        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1de54ccbfea3c2dcfeffd0338867c3b5`
                    ),
                ]);

                if (!movieResponse.ok) {
                    throw new Error(`HTTP error! Status: ${movieResponse.status}`);
                }
                 if (!videosResponse.ok) {
                   throw new Error(`HTTP error! Status: ${videosResponse.status}`);
               }

               const movieData = await movieResponse.json();
               const videosData = await videosResponse.json();

                setMovie(movieData);
                setVideos(videosData.results);
            } catch (err) {
              setError(err.message)
            } finally {
             setLoading(false);
          }
        };
         fetchMovieData();
    }, [id]);


   const getTrailerKey = (videos) => {
         if (!videos || videos.length === 0) return null;
          const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");
           if (trailer) {
              return trailer.key;
        }
      return videos.find(video => video.site === "YouTube")?.key || null
    }
    if (loading) {
        return <div className="loading">Loading...</div>;
    }
    if (error) {
        return <div className="loading">Error: {error}</div>;
    }

    if (!movie) {
        return <div className="loading">Loading...</div>;
    }

 const trailerKey = getTrailerKey(videos);
 const youtubeUrl = trailerKey ? `https://www.youtube.com/embed/${trailerKey}` : null;
    const handleImageClick = () => {
       if(youtubeUrl){
       setShowTrailer(true)
       }
  };


    return (
        <div className="movie-desc-container">
            <h1>{movie.title}</h1>
            <p className="tagline">{movie.tagline}</p>
            <div className={`movie-header ${showTrailer ? 'movie-header-trailer' : ''}`}>
                <div style={{width: showTrailer ? '100%' : '120%', marginRight: showTrailer ? 0 : '20px' }}>
                    {!showTrailer && (
                         <div
                          className="movie-poster"
                            onClick={handleImageClick}
                           style={{ cursor: "pointer" }}
                            >
                           <img
                             src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                              alt={movie.title}
                            />
                         </div>
                       )}
                        {youtubeUrl && showTrailer && (
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
                         {!youtubeUrl && (
                           <p>No trailer available.</p>
                           )}
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
        </div>
    );
}

export default MovieDescription;
