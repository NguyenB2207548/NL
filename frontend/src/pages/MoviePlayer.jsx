import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Carousel, Card, Button } from "react-bootstrap";
import ReactPlayer from "react-player"; // npm install react-player
import "../assets/css/MoviePlayer.css";

// Dữ liệu mẫu cho phim hiện tại (giữ nguyên)
const currentMovie = {
  id: 1,
  title: "Avengers: Endgame",
  year: 2019,
  description:
    "Bom tấn hành động đỉnh cao. Kết thúc hành trình 10 năm của các siêu anh hùng.",
  trailerUrl: "http://localhost:5173/IronMan3.mp4",
  duration: "181 phút",
  rating: 8.4,
  resumeTime: 1200, // 20 phút
};

// Dữ liệu mẫu gợi ý (SỬA THUMBNAIL THỰC TẾ)
const suggestedMovies = [
  {
    id: 2,
    title: "Spider-Man: No Way Home",
    year: 2021,
    thumbnail:
      "http://www.impawards.com/2021/posters/spiderman_no_way_home_ver11_xxlg.jpg", // URL thực tế
    description: "Cuộc phiêu lưu đa vũ trụ.",
  },
  {
    id: 3,
    title: "Black Panther: Wakanda Forever",
    year: 2022,
    thumbnail:
      "http://www.impawards.com/2022/posters/blackpanther_wakanda_forever_ver4_xxlg.jpg", // URL thực tế
    description: "Tiếp nối di sản Wakanda.",
  },
  {
    id: 4,
    title: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
    thumbnail:
      "http://www.impawards.com/2022/posters/doctor_strange_in_the_multiverse_of_madness_ver7_xxlg.jpg", // URL thực tế
    description: "Hành trình qua đa vũ trụ.",
  },
];

const MoviePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  //   const [volume, setVolume] = useState(0.5);
  const [imagesLoaded, setImagesLoaded] = useState(false); // Thêm state preload
  const playerRef = useRef(null);

  // Preload thumbnails
  useEffect(() => {
    const loadImages = async () => {
      const promises = suggestedMovies.map((movie) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log(`Loaded thumbnail: ${movie.title}`);
            resolve();
          };
          img.onerror = () => {
            console.error(`Error loading thumbnail: ${movie.title}`);
            resolve(); // Vẫn tiếp tục nếu lỗi một ảnh
          };
          img.src = movie.thumbnail;
        });
      });
      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Some thumbnails failed:", error);
        setImagesLoaded(true);
      }
    };
    loadImages();
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeekToResume = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(currentMovie.resumeTime);
    }
  };

  if (!imagesLoaded) {
    return <div className="movie-player-page">Đang tải hình ảnh...</div>;
  }

  return (
    <div className="movie-player-page">
      {/* Header tối giản */}
      <header className="player-header">
        <Container>
          <Row className="align-items-center">
            <Col xs={6}>
              <h1 className="movie-title">
                {currentMovie.title} ({currentMovie.year})
              </h1>
            </Col>
            <Col xs={6} className="text-end">
              <Button
                variant="outline-light"
                size="sm"
                onClick={handlePlayPause}
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="outline-light" size="sm" className="ms-2">
                Full Screen
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Layout: Player + Sidebar */}
      <Container fluid className="player-container">
        <Row>
          {/* Video Player Chính */}
          <Col lg={9} className="player-col">
            <div className="video-wrapper">
              <ReactPlayer
                ref={playerRef}
                url={currentMovie.trailerUrl}
                playing={isPlaying}
                // volume={volume}
                controls={true}
                width="100%"
                height="100%"
                config={{
                  youtube: {
                    playerVars: { autoplay: 1 },
                  },
                }}
              />
              {/* Synopsis và Controls */}
              <div className="player-overlay">
                <p className="movie-description">{currentMovie.description}</p>
                <div className="player-controls">
                  <span>
                    Thời lượng: {currentMovie.duration} | Rating:{" "}
                    {currentMovie.rating}/10
                  </span>
                  {currentMovie.resumeTime > 0 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={handleSeekToResume}
                    >
                      Tiếp Tục Xem (Từ{" "}
                      {Math.floor(currentMovie.resumeTime / 60)}:00)
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>

          {/* Sidebar Gợi Ý - Thêm onLoad/onError cho debug */}
          <Col lg={3} className="sidebar-col">
            <h5 className="sidebar-title">Gợi Ý Tiếp Theo</h5>
            <Carousel
              interval={3000}
              indicators={false}
              className="suggested-carousel"
            >
              {suggestedMovies.map((movie) => (
                <Carousel.Item key={movie.id}>
                  <Card className="suggested-card">
                    <Card.Img
                      variant="top"
                      src={movie.thumbnail}
                      alt={movie.title}
                      onLoad={() =>
                        console.log(`${movie.title} thumbnail loaded`)
                      }
                      onError={(e) =>
                        console.error(`Thumbnail error: ${movie.title}`, e)
                      }
                    />
                    <Card.Body>
                      <Card.Title>
                        {movie.title} ({movie.year})
                      </Card.Title>
                      <Card.Text>{movie.description}</Card.Text>
                      <Button variant="danger" size="sm">
                        Xem Ngay
                      </Button>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      {/* Footer với Progress */}
      <footer className="player-footer">
        <Container>
          <div className="progress-bar">
            <span>0:00 / {currentMovie.duration}</span>
            <div className="progress-fill"></div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default MoviePlayer;
