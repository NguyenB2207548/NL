import "../assets/css/Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 className="footer-logo">🎬 MovieZone</h2>
          <p>
            Khám phá thế giới điện ảnh — xem trailer, tìm phim bằng hình ảnh, và
            hơn thế nữa.
          </p>
        </div>

        <div className="footer-section">
          <h3>Liên kết</h3>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/movies">Phim</a>
            </li>
            <li>
              <a href="/about">Giới thiệu</a>
            </li>
            <li>
              <a href="/contact">Liên hệ</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Theo dõi chúng tôi</h3>
          <div className="social-links">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {year} MovieZone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
