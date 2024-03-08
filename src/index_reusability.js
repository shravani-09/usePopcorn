import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import StarRating from "./Components/StarRating";
// import "./index.css";
// import App from "./App";

function Test() {
  const [movieRating, setMovieRating] = useState();
  return (
    <div>
      <StarRating
        maxRating={5}
        size={24}
        color="green"
        onSetRating={setMovieRating}
      />
      <p>This movie has {movieRating}</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StarRating size={24} color="red" className="test" maxRating={10} />
    <StarRating
      maxRating={5}
      size={24}
      color="green"
      messages={["terrible", "bad", "okay", "good", "best"]}
      initialRating={3}
    />
    <Test />
  </React.StrictMode>
);
