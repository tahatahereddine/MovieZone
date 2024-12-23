import React, { createContext, useState, useEffect } from "react";

// Create a Context
export const FavoritesContext = createContext();

// Create a Provider Component
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage when the app initializes
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save favorites to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Function to add a movie to favorites
    const addFavorite = (movie) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites([...favorites, movie]);
        }
    };

    // Function to remove a movie from favorites
    const removeFavorite = (movieId) => {
        setFavorites(favorites.filter(fav => fav.id !== movieId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
