import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Nav from "../Components/Nav";


const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser) {
      setUserName(auth.currentUser.displayName || "User");
    }
  }, []);

  return (
    <div className="home-container">

      {/* Navbar Component */}
      <Nav />

      {/*  Hero Section with full blur background */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-overlay">
          <h1>Welcome, {userName}!</h1>
          <p>Experience a smarter way to shop - No Queues, No Hassles!</p>
          <button onClick={() => navigate("/products")}>Start Shopping</button>
        </div>
      </section>

      {/*  Feature Highlights */}
      <section className="features-section">
        <h2>Why Choose SmartCart?</h2>
        <div className="feature-cards">
          <div className="feature-card">🛍 Instant Product Scan</div>
          <div className="feature-card">💳 Automated Billing</div>
          <div className="feature-card">⏱ No Queues</div>
          <div className="feature-card">📱 Real-time Cart Updates</div>
        </div>
      </section>

      {/*  How It Works */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="how-cards">
          <div className="how-card">🔐 Login to your Account</div>
          <div className="how-card">📦 Scan Items via RFID</div>
          <div className="how-card">🛒 View Cart & Total</div>
          <div className="how-card">✅ Pay & Exit Seamlessly</div>
        </div>
      </section>
    </div>
  );
};

export default Home;




