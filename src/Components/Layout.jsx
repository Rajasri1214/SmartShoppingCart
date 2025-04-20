// src/Components/Layout.jsx
import Nav from "./Nav";
import { Outlet } from "react-router-dom"; // To render the specific page content inside the layout
import Footer from "./Footer";
import "../styles/Footer.css"; // Import your layout styles here

const Layout = () => {
  return (
    <div className="app-container">
      <Nav /> {/* This will show the Navbar on all pages */}
      <main style={{ paddingTop: "80px" }}> {/* Adjust paddingTop if needed */}
        <Outlet /> {/* This will render the specific page content */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
