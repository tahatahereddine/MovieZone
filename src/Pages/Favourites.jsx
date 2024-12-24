import React, { useState, useEffect } from 'react';
import MoviesList from '../components/MoviesList/MoviesList';

function Favourites() {
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const API_KEY = '1de54ccbfea3c2dcfeffd0338867c3b5';

  useEffect(() => {
    // Fetch genres on component mount
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    // Get favourite movies from localStorage
    const storedFavourites = localStorage.getItem('favouriteMovies');
    if (storedFavourites) {
      setFavouriteMovies(JSON.parse(storedFavourites));
    }

    fetchGenres();
  }, []);

  if (favouriteMovies.length === 0) {
    return (
      <div style={{ 
        marginLeft: '150px', 
        marginBottom: '40px', 
        color: '#fff',
        textAlign: 'center'
      }}>
        <h1 style={{fontSize:"3rem", color:"#ffd700"}}>Your Favourites</h1>
        <p style={{fontSize:"2rem"}}>No favourite movies added yet.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      marginLeft: '270px', 
      marginTop: '80px'
    }}>
      <MoviesList 
        movies={favouriteMovies} 
        genres={genres} 
        title="Your Favourites" 
      />
    </div>
  );
}

export default Favourites;