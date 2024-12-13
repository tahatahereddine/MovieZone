import React from 'react';
import './TrendingSection.css';
import oppenheimer from './oppenheimer.webp';

const TrendingSection = () => {
    const trendingMovies = [
        { 
            title: 'Lord Of The Rings', 
            year: 2024, 
            genre: 'Sci-Fi', 
            rating: 4, 
            image: 'https://via.placeholder.com/200x300?text=Lord+Of+The+Rings' 
        },
        { 
            title: 'Captaine America', 
            year: 2014, 
            genre: 'Action', 
            rating: 5, 
            image: '../../assets/captain-america.webp' 
        },
        { 
            title: 'Oppenheimer', 
            year: 2024, 
            genre: 'History', 
            rating: 5, 
            image: oppenheimer
        },
        { 
            title: 'Pirates Of The Caribbean', 
            year: 2021, 
            genre: 'Adventure', 
            rating: 4, 
            image: 'https://via.placeholder.com/200x300?text=Pirates+Of+The+Caribbean' 
        },
    ];

    return (
        <div className="trending-section">
            <h2 className="section-title">Trending</h2>
            <div className="movie-carousel">
                {trendingMovies.map((movie, index) => (
                    <div key={index} className="movie-card">
                        <img 
                            src={movie.image} 
                            alt={movie.title} 
                            className="movie-image" 
                        />
                        <div className="card-content">
                            <h3 className="movie-card-title">{movie.title}</h3>
                            <p className="movie-card-info">
                                {movie.year} | {movie.genre}
                            </p>
                            <div className="movie-rating">
                                {'⭐'.repeat(movie.rating)}
                                {'☆'.repeat(5 - movie.rating)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrendingSection;
