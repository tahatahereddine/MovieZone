import React, {useState, useEffect} from "react";
import MoviesList from "../components/MoviesList/MoviesList";

function Home(props) {
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
        }, []);
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
            .then((response) => response.json())
            .then((data) => {
                setGenre(data.genres);
            });
        }, []);
    return (
        <MoviesList movies={movies} handleFavourites={props.handleFavourites} ></MoviesList>
    );
}
export default Home;