import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card/Card";
function Home() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                console.log(data.results);
            });
        }, []);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
            .then((response) => response.json())
            .then((data) => {
                setGenre(data.genres);
                console.log(data.genres);
            });
        }, []);
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
    
    return (
        <div className="movies-list" style={styles.moviesList}>
            {movies.map((movie) => (
                <div
                key={movie.id}
                onClick={() => handleCardClick(movie.id)}
                style={{ display: "inline-block", cursor: "pointer" }}
                >
                <Card image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                id={movie.id}
                title={movie.title}
                release_date={movie.release_date}
                genres={genre.map((genre) => {
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
export default Home;