import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import cartImage from "../assets/images/shop.jpg"; 
import Nav from "../Components/Nav"; // Import your Nav component
import "../styles/Button.css"; // Import button styles

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Nav/>
      <div className="landing-content">
        {/* Left Side: Text */}
        <div className="landing-text">
          <h4 className="tagline">Smart Retailing</h4>
          <h1 className="main-heading">No More Long Queues!</h1>
          <p className="description">
            Experience the future of shopping — real-time tracking and instant checkout with our smart cart.
          </p>
          <Link to="/login">
            <button className="button">Get Started</button>
          </Link>
        </div>

        {/* Right Side: Image */}
        <div className="landing-image">
          <img src={cartImage} alt="Smart Shopping Cart" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;




