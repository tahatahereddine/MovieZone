import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
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
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Documentaries from "./Pages/Documentaries";
import CompanyPage from "./Pages/CompanyPage/CompanyPage";
import "./App.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/SignUp";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/documentaries" element={<Documentaries />} />
        <Route path="/movie/:id" element={<MovieDescription />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
