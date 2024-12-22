import React, {useState, useEffect } from "react";
import MoviesList from "../../components/MoviesList/MoviesList";
import { useParams } from "react-router-dom";

function Search() {
    const { title } = useParams();
    const [movie, setMovie] = useState(null);
    const [genre, setGenre] = useState([]);
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=1de54ccbfea3c2dcfeffd0338867c3b5&language=en-US&query=${title}`)
            .then(response => response.json())
            .then(data => {
                setMovie(data.results);
                console.log(movie);
            });
    }, [title]);
    useEffect(() => {
            fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
                .then((response) => response.json())
                .then((data) => {
                    setGenre(data.genres);
                });
    }, []);

    return (
        <MoviesList movies={movie} genre={genre}></MoviesList>
    );
}

export default Search;
