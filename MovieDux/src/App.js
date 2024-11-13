import './App.css';
import './styles.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import MovieGrid from './Components/MovieGrid';
import Watchlist from './Components/WatchList';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useState, useEffect } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist]  = useState([])


  useEffect (() =>{
    fetch("movies.json")
    .then(response => response.json())
    .then(data => setMovies(data))
 },[] );

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((Id) => (Id !==movieId))
        : [...prev, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        <Router>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/Watchlist"}>Your Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MovieGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            >
              
            </Route>
            <Route
              path="/Watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
