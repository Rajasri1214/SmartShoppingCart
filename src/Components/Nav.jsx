import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Nav.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to landing page after logout
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Smart Shopping Cart</div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li onClick={() => { navigate("/home"); setMenuOpen(false); }}>Home</li>
        <li onClick={() => { navigate("/products"); setMenuOpen(false); }}>Products</li>
        <li onClick={() => { navigate("/cart"); setMenuOpen(false); }}>Cart</li>
        <li onClick={() => { navigate("/payment"); setMenuOpen(false); }}>Payment</li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </nav>
  );
};

export default Navbar;
