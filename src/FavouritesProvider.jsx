import React, { useState, createContext } from "react";

// Create the context
export const FavoritesContext = createContext();

// Create the provider component
function FavouritesProvider({ children }) {
    const [favourites, setFavourites] = useState([]);

    return (
        <FavoritesContext.Provider value={{ favourites, setFavourites }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export default FavouritesProvider;
