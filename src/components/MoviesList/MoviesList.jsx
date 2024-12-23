import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";

function moviesList(props){
    const navigate = useNavigate();

    const styles ={
        moviesList: {
            marginLeft: "270px",
            justifyContent: "center",
            display: "inline-block",
            marginTop: "80px",
            backgroundColor: "#060b26"
        }
    }

    const handleCardClick = (id) => {
        navigate(`/movie/${id}`);
    };

    return(
        <div className="movies-list" style={styles.moviesList}>
            <h1 style={{color:" #ffd700", margin:"0 0 20px 30px"}}>{props.title || "Discover"}</h1>
            {props.movies.map((movie) => (
                <div
                key={movie.id}
                // onClick={() => handleCardClick(movie.id)}
                style={{ display: "inline-block", cursor: "pointer" }}
                >
                <Card image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                handleClick={handleCardClick}
                genres={props.genre.map((genre) => {
                    if(movie.genre_ids.includes(genre.id)){
                        return genre.name ? genre.name: "";
                    }
                })}
                rating={Number(movie.vote_average).toFixed(1)}
                ></Card>
                </div>
            ))}
        </div>
    );
}
export default moviesList;
