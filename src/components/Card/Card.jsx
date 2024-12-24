import React, { useState } from "react";
import "./Card.css";
import fallback from "../../images/fallback.png";
import imdb from "./imdb.png";

function Card(props) {
    const [isFavorite, setIsFavorite] = useState(false);

    const img = props.poster_path === "fallback" ? fallback : props.poster_path;
    const movie = {
        title: props.title,
        poster_path: img,
        release_date: props.release_date,
        vote_average: props.vote_average,
        popularity: props.popularity,
        genres: props.genres,
    };

    const toggleFavorite = (event) => {
        event.stopPropagation();
        setIsFavorite(!isFavorite);
        console.log("added to favourite", movie);
    };
        
    return (
        <>
            <div className="movie" key={movie.id}>
                <div className={`favorite ${isFavorite ? "active" : ""}`} onClick={toggleFavorite}>
                    <div className="eclipse">
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Ellipse 3" filter="url(#filter0_b_1327_248)">
                                <ellipse cx="15" cy="15.1842" rx="15" ry="14.6053" fill="#ffffff" fillOpacity="1" />
                            </g>
                            <defs>
                                <filter id="filter0_b_1327_248" x="-2" y="-1.42105" width="34" height="33.2105" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                    <feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
                                    <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1327_248" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1327_248" result="shape" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <div className="heart">
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Heart">
                                <path
                                    id="Icon"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z"
                                    fill={isFavorite ? "red" : "#D1D5DB"}
                                />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="poster">
                    <img src={img} alt={movie.title} />
                </div>
                <div className="details">
                    <p className="title">{props.title}</p>
                    <p className="date">{props.release_date} | {props.genre}</p> 
                    <div className="rating">
                        <div className="imdb">
                            <img src={imdb} alt="IMDB Logo" />
                            <p>{`${movie.vote_average}/10`}<span>★</span> | popularity: {movie.popularity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
