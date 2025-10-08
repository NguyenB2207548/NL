import React from "react";
import "../assets/css/MovieGrid.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title} />
        <div className="movie-overlay">
          <button className="watch-btn">▶ Xem ngay</button>
        </div>
      </div>
      <h4 className="movie-title">{movie.title}</h4>
    </div>
  );
};

export default MovieCard;
