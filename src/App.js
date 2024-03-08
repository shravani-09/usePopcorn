import NavBar from "./Containers/NavBar/NavBar";
import Main from "./Containers/Main/Main";
import { useState } from "react";
import SearchBar from "./Components/SearchBar";
import NumResults from "./Components/NumResults";
import Box from "./Components/Box";
import WatchedSummary from "./Containers/Main/Box/WatchedBox/WatchedSummary/WatchedSummary";
import WatchedMoviesList from "./Containers/Main/Box/WatchedBox/WatchedMoviesList/WatchedMoviesList";
import MovieList from "./Containers/Main/Box/ListBox/MovieList/MovieList";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import MovieDetails from "./Containers/Main/Box/MovieDetails/MovieDetails";
import { useMovies } from "./Hooks/useMovies";
import { useLocalStorageState } from "./Hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  const { movies, isLoading, error } = useMovies(query);

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovieDetail() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleWatchedMovieDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onMovieClose={handleCloseMovieDetail}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onWatchedMovieDelete={handleWatchedMovieDelete}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
