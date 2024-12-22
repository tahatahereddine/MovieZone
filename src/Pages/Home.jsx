import React, {useState, useEffect} from "react";
import Card from "../components/Card/Card";
function Home() {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
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
    return (
        <>
        <div className="movies-list" style={styles.moviesList}>
            {movies.map((movie) => (
                <Card image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                title={movie.title}
                release_date={movie.release_date}
                genres={genre.map((genre) => {
                    if(movie.genre_ids.includes(genre.id)){
                        return genre.name? genre.name: "";
                    }
                })}
                rating={movie.vote_average}
                ></Card>
            ))}

        </div>
        
        
        </>
        
    );
}
export default Home;