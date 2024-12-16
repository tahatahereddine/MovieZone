import React, {useState, useEffect} from "react";
function Home() {
    const URL= "https://api.themoviedb.org/3/movie/550?api_key=1de54ccbfea3c2dcfeffd0338867c3b5";
    const [movies, setMovies] = React.useState([]);
    return (
        <>
        <div className="home">
            <h1>Home</h1>
        </div>
        </>
        
    );
}
export default Home;