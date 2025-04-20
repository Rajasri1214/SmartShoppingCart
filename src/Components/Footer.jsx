// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <Link to="/terms" className="footer-link">Terms & Conditions</Link>
        <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        <Link to="/refund" className="footer-link">Refund Policy</Link>
        <Link to="/contact" className="footer-link">Contact Us</Link>
      </div>
    </footer>
  );
}

export default Footer;
