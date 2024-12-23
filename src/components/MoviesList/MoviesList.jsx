import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { FaSort, FaFilter } from "react-icons/fa";

function MoviesList(props) {
  const genres =[
    {"id":28,"name":"Action"},
    {"id":12,"name":"Adventure"},
    {"id":16,"name":"Animation"},
    {"id":35,"name":"Comedy"},
    {"id":80,"name":"Crime"},
    {"id":99,"name":"Documentary"},
    {"id":18,"name":"Drama"},
    {"id":10751,"name":"Family"},
    {"id":14,"name":"Fantasy"},
    {"id":36,"name":"History"},
    {"id":27,"name":"Horror"},
    {"id":10402,"name":"Music"},
    {"id":9648,"name":"Mystery"},
    {"id":10749,"name":"Romance"},
    {"id":878,"name":"Science Fiction"},
    {"id":10770,"name":"TV Movie"},
    {"id":53,"name":"Thriller"},
    {"id":10752,"name":"War"},
    {"id":37,"name":"Western"}
  ]
  const [showFilters, setShowFilters] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [sort, setSort] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const styles = {
    moviesList: {
      marginLeft: "270px",
      justifyContent: "center",
      display: "inline-block",
      marginTop: "80px",
      backgroundColor: "#060b26",
      zIndex: "1",
    },
    filterItem: {
      cursor: "pointer",
      margin: "10px",
      padding: "5px",
      borderRadius: "5px",
    },
    filterItemHover: {
      backgroundColor: "lightyellow",
    },
  };

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  const sortMovies = (movies) => {
    let filteredMovies = movies;
    if (selectedGenres.length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.genre_ids.some((id) => selectedGenres.includes(id))
      );
    }

    if (!sort) return filteredMovies;

    const [key, order] = sort.split(".");
    return filteredMovies.slice().sort((a, b) => {
      if (order === "asc") {
        return key === "release_date" ? new Date(a[key]) - new Date(b[key]) : a[key] > b[key] ? 1 : -1;
      } else {
        return key === "release_date" ? new Date(b[key]) - new Date(a[key]) : a[key] < b[key] ? 1 : -1;
      }
    });
  };

  const toggleGenre = (id) => {
    setSelectedGenres((prevSelectedGenres) =>
      prevSelectedGenres.includes(id)
        ? prevSelectedGenres.filter((genreId) => genreId !== id)
        : [...prevSelectedGenres, id]
    );
  };

  const sortedMovies = sortMovies(props.movies);

  return (
    <div className="movies-list" style={styles.moviesList}>
      <div style={{ display: "flex", alignItems: "center", margin: "0 0 20px 30px" }}>
        <h1 style={{ color: "#ffd700", margin: 0, flexGrow: 1 }}>{props.title || "Discover"}</h1>
        <span
          style={{ cursor: "pointer", marginRight: "20px", color: "gold", fontSize: "15px" }}
          onClick={() => setShowGenres(!showGenres)}
        >
          <FaFilter style={{verticalAlign:"bottom", cursor: "pointer", color: "gold" }} />filter&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span
          style={{ cursor: "pointer", marginRight: "20px", color: "gold", fontSize: "15px" }}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaSort style={{verticalAlign:"bottom", cursor: "pointer", color: "gold" }} />sort by
        </span>
        {showFilters && (
          <div
            style={{
              zIndex: "10000",
              position: "absolute",
              top: "120px",
              right: "20px",
              backgroundColor: "yellow",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {["title.asc", "title.desc", "release_date.asc", "release_date.desc", "vote_average.asc", "vote_average.desc", "popularity.asc", "popularity.desc"].map((sortOption) => (
                <li
                  key={sortOption}
                  onClick={() => setSort(sortOption)}
                  style={styles.filterItem}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.filterItemHover.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  {sortOption.replace(".", " ")}
                </li>
              ))}
            </ul>
          </div>
        )}
        {showGenres && (
          <div
            style={{
              zIndex: "10000",
              position: "absolute",
              top: "120px",
              right: "160px",
              backgroundColor: "yellow",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {genres.map((genre) => (
                <li
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  style={{
                    ...styles.filterItem,
                    backgroundColor: selectedGenres.includes(genre.id) ? "lightyellow" : "",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.filterItemHover.backgroundColor)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = selectedGenres.includes(genre.id) ? "lightyellow" : "")}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {sortedMovies.map((movie) => {
        const movieGenres = movie.genre_ids.map((id) => genres.find((genre) => genre.id === id)?.name+" ").filter(Boolean);
        return (
          <div
            key={movie.id}
            onClick={() => handleCardClick(movie.id)}
            style={{ display: "inline-block", cursor: "pointer" }}
          >
            <Card
              poster_path={movie.poster_path === null ? "fallback" : `https://image.tmdb.org/t/p/original${movie.poster_path}`}
              id={movie.id}
              title={movie.title}
              release_date={movie.release_date}
              vote_average={Number(movie.vote_average).toFixed(1)}
              popularity={movie.popularity}
              genres={movieGenres}
            ></Card>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesList;
