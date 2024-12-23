import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

function MoviesList(props) {
    const navigate = useNavigate();

    const styles = {
        moviesList: {
            marginLeft: "270px",
            justifyContent: "center",
            display: "inline-block",
            marginTop: "80px",
            backgroundColor: "#060b26",
            zIndex: "1",
        },
    };

    const handleCardClick = (item, type) => {
        navigate(`/movie/${item.id}`, { state: { item, type } });
    };

    return (
        <div className="movies-list" style={styles.moviesList}>
            <h1 style={{ color: "#ffd700", margin: "0 0 20px 30px" }}>
                {props.title || "Discover"}
            </h1>
            {props.movies.map((movie) => (
                <div
                    key={movie.id}
                    onClick={() => handleCardClick(movie, "movie")}
                    style={{ display: "inline-block", cursor: "pointer" }}
                >
                    <Card
                        poster_path={
                            movie.poster_path === null
                                ? "fallback"
                                : `https://image.tmdb.org/t/p/original${movie.poster_path}`
                        }
                        id={movie.id}
                        title={movie.title || movie.name}
                        release_date={movie.release_date}
                        vote_average={Number(movie.vote_average).toFixed(1)}
                    ></Card>
                </div>
            ))}
            {props.series &&
                props.series.map((serie) => (
                    <div
                        key={serie.id}
                        onClick={() => handleCardClick(serie, "series")}
                        style={{ display: "inline-block", cursor: "pointer" }}
                    >
                        <Card
                            poster_path={
                                serie.poster_path === null
                                    ? "fallback"
                                    : `https://image.tmdb.org/t/p/original${serie.poster_path}`
                            }
                            id={serie.id}
                            title={serie.name || serie.title}
                            release_date={serie.release_date}
                            vote_average={Number(serie.vote_average).toFixed(1)}
                        ></Card>
                    </div>
                ))}
        </div>
    );
}

export default MoviesList;
