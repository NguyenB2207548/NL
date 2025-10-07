import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/css/Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    console.log("Tìm kiếm:", searchTerm);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">MovieZone</Link>
        </div>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Tìm kiếm phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>

        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/movies">Phim</Link>
          <Link to="/genres">Thể loại</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/login" className="login-btn">
            Đăng nhập
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
