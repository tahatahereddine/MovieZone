import React from 'react';
import './FeaturedMovie.css';

const FeaturedMovie = () => {
    return (
        <div className="featured-movie">
            <div className="movie-details">
                <h2 className="movie-title">Avatar</h2>
                <p className="movie-info">2009 | Sci-Fi | 3 Parts</p>
                <div className="movie-actions">
                    <button className="btn watch-btn">Voir Plus</button>
                    <button className="btn favorite-btn">❤️</button>
                </div>
            </div>
        </div>
    );
};

export default FeaturedMovie;
