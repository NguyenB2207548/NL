import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Adjust path nếu cần
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviePlayer from "./pages/MoviePlayer";
import "./App.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <BrowserRouter>
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/movie" element={<MoviePlayer />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
