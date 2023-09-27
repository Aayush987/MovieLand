import { useState,useEffect } from 'react';
import "./App.css";
import SearchIcon from "/search.svg";
import MovieCard from './MovieCard.jsx';

const API_URL = "https://www.omdbapi.com?apikey=f0eed2b4";

function App() {
    const [Movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState("");

  const Searchmovies = async (title) => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      
      console.log(data.Search);
      setMovies(data.Search);
  }

  useEffect(() => {
        Searchmovies("Batman");
  },[])
  

  return (
    <div className="App">
      <h1 className= "title">Movieland</h1>

      <div className="search">
        <input value = {searchTerm} onChange={(e) => {setSearchTerm(e.target.value)}} placeholder= "Search for movies" />
        <img src = {SearchIcon} alt = "searchicon" onClick={() => {Searchmovies(searchTerm)}} />
      </div>
      
   
   {Movies?.length > 0 ?
           (
            <div className="container">
              {Movies.map((movies) => (
                  <MovieCard key={movies.imdbID} movie = {movies} />
               ))} 
               </div>
           ):
           (
            <div className="empty">
              <h2>No Movies Found</h2>
            </div>
           )
   }
    </div>
  )
}

export default App
