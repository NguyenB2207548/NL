import React, { useState, useRef, useEffect } from "react";
import "../assets/css/MoviePlayer.css"; // Giả sử CSS file này tồn tại, hoặc inline nếu cần

// Dữ liệu phim hiện tại (cập nhật cho Iron Man 3)
const currentMovie = {
  id: 1,
  title: "Iron Man 3",
  year: 2013,
  description:
    "Bom tấn siêu anh hùng với Robert Downey Jr. trong vai Tony Stark đối mặt với kẻ thù mới.",
  videoUrl: "http://localhost:5000/api/public/IronMan3.mp4",
  duration: "130 phút",
  rating: 7.2,
  resumeTime: 1200, // 20 phút (giây)
};

// Dữ liệu gợi ý (thumbnails giả định - thay bằng URL thực tế)
const suggestedMovies = [
  {
    id: 2,
    title: "Avengers: Endgame",
    year: 2019,
    thumbnail:
      "http://localhost:5000/api/public/spiderman_no_way_home_xxlg.jpg",
    description: "Kết thúc hành trình siêu anh hùng.",
  },
  {
    id: 3,
    title: "Spider-Man: No Way Home",
    year: 2021,
    thumbnail:
      "http://localhost:5000/api/public/spiderman_no_way_home_xxlg.jpg",
    description: "Cuộc phiêu lưu đa vũ trụ.",
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    thumbnail:
      "http://localhost:5000/api/public/spiderman_no_way_home_xxlg.jpg",
    description: "Tiếp nối di sản Wakanda.",
  },
];

const MoviePlayer = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false); // Cho mobile toggle

  // Xử lý play/pause
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  // Resume từ thời điểm lưu
  const handleResume = () => {
    if (videoRef.current && currentMovie.resumeTime > 0) {
      videoRef.current.currentTime = currentMovie.resumeTime;
    }
  };

  // Fullscreen
  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  // Theo dõi progress - Optimize: Chỉ set duration từ loadedmetadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Cleanup
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Format thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Toggle sidebar cho mobile
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="movie-player-content">
      {/* Main Content */}
      <main className="main-content">
        {/* Player Column */}
        <section className="player-section">
          {/* Video Player */}
          <div className="video-container">
            <video
              ref={videoRef}
              controls
              autoPlay
              muted
              className="video-player"
              onClick={handlePlayPause}
            >
              <source src={currentMovie.videoUrl} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>

            {/* Overlay Info (hiện khi hover hoặc paused) */}
            <div className="player-overlay">
              <div className="movie-info">
                <h2 className="movie-title">
                  {currentMovie.title} ({currentMovie.year})
                </h2>
                <p className="movie-description">{currentMovie.description}</p>
                <div className="movie-meta">
                  <span>Thời lượng: {currentMovie.duration}</span>
                  <span>Đánh giá: {currentMovie.rating}/10</span>
                </div>
                {currentMovie.resumeTime > 0 && (
                  <button className="resume-btn" onClick={handleResume}>
                    Tiếp tục xem từ {formatTime(currentMovie.resumeTime)}
                  </button>
                )}
              </div>
            </div>

            {/* Custom Controls Overlay */}
            <div className="custom-controls">
              <button className="play-pause-btn" onClick={handlePlayPause}>
                {isPlaying ? "⏸️" : "▶️"}
              </button>
              <button className="fullscreen-btn" onClick={handleFullscreen}>
                ⛶
              </button>
            </div>

            {/* Mobile Toggle Button */}
            <button className="mobile-toggle-btn" onClick={toggleSidebar}>
              {showSidebar ? "Ẩn" : "Gợi Ý"}
            </button>
          </div>

          {/* Movie Details Below Player */}
          <div className="movie-details">
            <h3>{currentMovie.title}</h3>
            <p>{currentMovie.description}</p>
          </div>
        </section>

        {/* Sidebar Gợi Ý */}
        <aside className={`sidebar ${showSidebar ? "show" : ""}`}>
          <h3 className="sidebar-title">Gợi Ý Tiếp Theo</h3>
          <div className="suggested-list">
            {suggestedMovies.map((movie) => (
              <div key={movie.id} className="suggested-card">
                <img
                  src={movie.thumbnail}
                  alt={movie.title}
                  className="card-thumb"
                  onError={(e) => {
                    e.target.src =
                      "http://localhost:5000/api/public/spiderman_no_way_home_xxlg.jpg";
                  }}
                />
                <div className="card-info">
                  <h4>
                    {movie.title} ({movie.year})
                  </h4>
                  <p>{movie.description}</p>
                  <button className="watch-btn">Xem Ngay</button>
                </div>
              </div>
            ))}
          </div>
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            {showSidebar ? "Ẩn" : "Gợi Ý"}
          </button>
        </aside>
      </main>

      {/* Footer Progress - Giữ ở đây vì specific cho player */}
      <footer className="player-footer">
        <div className="progress-container">
          <span className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MoviePlayer;
