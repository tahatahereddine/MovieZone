import React from 'react';
import { useParams } from 'react-router-dom';
import MoviesList from '../components/MoviesList/MoviesList';
function Favourites() {
  const { favourites } = useParams();
  console.log("les favourites :" + favourites);
  return (
    <>
        <div>
          <h1>Favourites          </h1>
        </div>
    </>
    
  );
}
export default Favourites;