import { useEffect, useState } from "react";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/movie");
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách phim:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="homepage container">
      <h1 className="title">🎬 Movie Website</h1>

      {movies.length === 0 ? (
        <p>Đang tải danh sách phim...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={movie.thumbnail_url}
                alt={movie.title}
                className="movie-thumbnail"
              />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>
                  <strong>Năm:</strong> {movie.releaseYear}
                </p>
                <p>
                  <strong>Lượt xem:</strong> {movie.viewCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
