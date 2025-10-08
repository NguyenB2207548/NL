import React from "react";
import MovieCard from "./MovieCard";
import "../assets/css/MovieGrid.css";

const movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    image: "/avengers_endgame_xxlg.jpg",
  },
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    image: "/spiderman_no_way_home_xxlg.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    image: "/avengers_endgame_xxlg.jpg",
  },
  {
    id: 4,
    title: "Inception",
    image: "/avengers_endgame_xxlg.jpg",
  },
  {
    id: 5,
    title: "Doctor Strange",
    image: "/spiderman_no_way_home_xxlg.jpg",
  },
  {
    id: 6,
    title: "Black Panther",
    image: "/spiderman_no_way_home_xxlg.jpg",
  },
  {
    id: 7,
    title: "Guardians of the Galaxy",
    image: "/avengers_endgame_xxlg.jpg",
  },
  {
    id: 8,
    title: "The Batman",
    image: "/avengers_endgame_xxlg.jpg",
  },
];

const MovieGrid = () => {
  return (
    <section className="movie-grid-section">
      <div className="container">
        <h2 className="section-title">🎞 Phim nổi bật</h2>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieGrid;
