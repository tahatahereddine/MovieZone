import React from 'react'
import './Categories.css'
import imdb from '../../imdb.png';
import rotten from '../../rotten.png';

function Categories(props) {
    const [movies, setMovies] = React.useState([])

    function getMovies(category = "") {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2b1f693d67555b3bc4bc31399d43443b&with_genres=${category}`)
            .then(res => res.json())
            .then(data => {
                const Bestmovies = data.results
                setMovies(Bestmovies)
            }
            )
    }
    React.useEffect(() => {
        getMovies()
    }, []);
    function changeCategory(event) {
        let list = Array.from(document.querySelectorAll('.categories ul li'))
        list.forEach(ele => {
            if (ele.classList.contains("clicked")) {
                ele.classList.remove("clicked")
            }
        })
        event.target.classList.add("clicked")
        getMovies(event.target.dataset.set)
    }
    return (
        <div className='container categories'>
            <div className='row justify-content-center'>
                <ul>
                    <li className='clicked' data-set="" onClick={(event) => changeCategory(event)}>All</li>
                    <li data-set="28" onClick={(event) => changeCategory(event)}>Action</li>
                    <li data-set="12" onClick={(event) => changeCategory(event)}>Adventure</li>
                    <li data-set="16" onClick={(event) => changeCategory(event)}>Animation</li>
                    <li data-set="35" onClick={(event) => changeCategory(event)}>Comedy</li>
                    <li data-set="80" onClick={(event) => changeCategory(event)}>Crime</li>
                    <li data-set="18" onClick={(event) => changeCategory(event)}>Drama</li>
                    <li data-set="10751" onClick={(event) => changeCategory(event)}>Family</li>
                </ul>
            </div>
            <div
                className="movies-lists row"
            >
                {
                    movies.map(movie => (
                        <div className="movies" key={movie.id}>
                            <div className='favorite' onClick={(event) => props.addToFavourite(event, movie)}>
                                <div className='eclipse'><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g id="Ellipse 3" filter="url(#filter0_b_1327_248)">
                                        <ellipse cx="15" cy="15.1842" rx="15" ry="14.6053" fill="#ffffff" fill-opacity="1" />
                                    </g>
                                    <defs>
                                        <filter id="filter0_b_1327_248" x="-2" y="-1.42105" width="34" height="33.2105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                            <feGaussianBlur in="BackgroundImageFix" stdDeviation="1" />
                                            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1327_248" />
                                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1327_248" result="shape" />
                                        </filter>
                                    </defs>
                                </svg>
                                </div>
                                <div className='heart'>
                                    <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="Heart">
                                            <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z" fill="#D1D5DB" />
                                        </g>
                                    </svg>

                                </div>
                            </div>
                            <div className="posters">
                                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
                            </div>
                            <div className="details">
                                <p className="date">{`USA, ${movie.release_date}`}</p>
                                <p className="title">{movie.original_title}</p>
                                <div className="rating">
                                    <div className="imdb">
                                        <img src={imdb} />
                                        <p>{`${movie.vote_average}/10`}</p>
                                    </div>
                                    <div className="rotten">
                                        <img src={rotten} />
                                        <p>{`${movie.vote_average * 10}%`}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories