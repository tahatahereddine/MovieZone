import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home";
import Favourites from "./Pages/Favourites";
import Trending from "./Pages/Trending";
import ComingSoon from "./Pages/ComingSoon";
import Settings from "./Pages/Settings";
import Logout from "./Pages/Logout";
import MovieDescription from "./Pages/MovieDescription/MovieDescription";
import Search from "./Pages/Search/Search";
import "./App.css";
function App() {

   // the list of favourites
  const {favourites, setFavourites} = React.useState([]);
  // get favourites from local storage
  function handleFavourites(event,movie) {
    let isFound = false;
    favourites.forEach(fav => {
      if (fav.id === movie.id) {
        isFound = true;
       
      }
    })
    if (isFound) {
      deleteFavourite(event,movie);
      event.target.classList.remove("favorite_clicked")
    }
    else {
      const updatedFavorites = [...favourites, movie]
      setFavourites(updatedFavorites)
      event.target.classList.toggle("favorite_clicked")
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  }
  function deleteFavourite(event,movie) {
    const updatedFavorites = favourites.filter(
      favourite => favourite.id !== movie.id
    )
    setFavourites(updatedFavorites)
      event.target.classList.remove("favorite_clicked")
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  }

  
  return (
    <>
    
    <Router>
      <Navbar favourites={favourites}/>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home handleFavourites={handleFavourites} />} />
        <Route path="/movie/:id" element={<MovieDescription />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/favourites/:favourites" element={<Favourites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
    </> 
  );
}

export default App;
