import React from "react";
import { Carousel, Button, Container } from "react-bootstrap";
import "../assets/css/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero-section">
      <Carousel fade indicators={false} controls interval={6000}>
        {/* Slide 1 */}
        <Carousel.Item>
          <div className="carousel-image">
            <img
              src="/avengers_endgame_xxlg.jpg"
              alt="Avengers: Endgame"
              className="d-block w-100"
            />
            <div className="overlay"></div>
          </div>

          <Carousel.Caption className="carousel-caption-custom">
            <Container>
              <div className="hero-content">
                <h1 className="hero-title">Avengers: Endgame</h1>
                <p className="hero-subtitle">
                  Bom tấn hành động đỉnh cao năm 2019. Kết thúc hành trình 10
                  năm của các siêu anh hùng.
                </p>
                <Button variant="danger" size="lg" className="hero-btn">
                  🎬 Xem Trailer Ngay
                </Button>
              </div>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
};

export default HeroSection;
