// src/Components/Layout.jsx
import Nav from "./Nav";
import { Outlet } from "react-router-dom"; // To render the specific page content inside the layout

const Layout = () => {
  return (
    <div>
      <Nav /> {/* This will show the Navbar on all pages */}
      <main style={{ paddingTop: "80px" }}> {/* Adjust paddingTop if needed */}
        <Outlet /> {/* This will render the specific page content */}
      </main>
    </div>
  );
};

export default Layout;
