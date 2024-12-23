import React, {useState, useEffect } from 'react';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useParams } from 'react-router-dom';
function Search(){
    const { search } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const [genre, setGenre] = useState([]);
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=1de54ccbfea3c2dcfeffd0338867c3b5&language=en-US&query=${search}`)
            .then(response => response.json())
            .then(data => {
                setSearchResult(data.results);
                console.log(data.results);
                console.log("Search results fetched successfully");
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
    }, [search]);
    useEffect(() => {
            fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1de54ccbfea3c2dcfeffd0338867c3b5")
                .then((response) => response.json())
                .then((data) => {
                    setGenre(data.genres);
                });
    }, [search]);

    return (
        <>
            <MoviesList movies={searchResult} genre={genre} ></MoviesList>
        </>
    );
}
export default Search;