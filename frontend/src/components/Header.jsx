import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../assets/css/Header.css";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // LẤY USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // LẮNG NGHE SỰ KIỆN ĐĂNG NHẬP THÀNH CÔNG
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    window.addEventListener("userChanged", loadUser);
    return () => window.removeEventListener("userChanged", loadUser);
  }, []);

  // ĐÓNG MENU KHI CLICK BÊN NGOÀI
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FIX MENU TỰ MỞ KHI ĐĂNG NHẬP LẠI
  useEffect(() => {
    setShowMenu(false);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setShowMenu(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    console.log("Tìm kiếm:", searchTerm);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* LOGO */}
        <div className="logo">
          <Link to="/">MovieZone</Link>
        </div>

        {/* Ô TÌM KIẾM */}
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

        {/* NAVIGATION */}
        <nav className="nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/genres">Thể loại</Link>
          <Link to="/about">Giới thiệu</Link>

          {user ? (
            <div className="user-menu" ref={menuRef}>
              <button
                className="user-avatar"
                onClick={() => setShowMenu(!showMenu)}
              >
                <span className="avatar-circle">
                  {user.fullname
                    ? user.fullname.charAt(0).toUpperCase()
                    : user.username.charAt(0).toUpperCase()}
                </span>
                <span className="username">{user.fullname}</span>
                <i
                  className={`fas fa-chevron-${
                    showMenu ? "up" : "down"
                  } chevron-icon`}
                ></i>
              </button>

              {showMenu && (
                <div className="dropdown-menu">
                  <Link to="/profile" onClick={() => setShowMenu(false)}>
                    Hồ sơ của tôi
                  </Link>
                  <button onClick={handleLogout}>Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-btn">
                Đăng nhập
              </Link>
              <Link to="/register" className="register-btn">
                Đăng ký
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
