import WatchedMovie from "../../../../../Components/WatchedMovie";

function WatchedMoviesList({ watched, onWatchedMovieDelete }) {
  console.log(watched);
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onWatchedMovieDelete={onWatchedMovieDelete}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
