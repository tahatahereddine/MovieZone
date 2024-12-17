import React, {useState, useEffect} from "react";
import { data } from "react-router-dom";
function Home() {
    const URL= "https://api.themoviedb.org/3/movie/550?api_key=1de54ccbfea3c2dcfeffd0338867c3b5";
    const [movies, setMovies] = React.useState([]);
    useEffect(() => {
        fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            setMovies(data.results);
            console.log(data.results);
        });
    }, []);

    return (
        <>
        <div className="home">
            <h1>{movies}</h1>
        </div>
        </>
        
    );
}
export default Home;