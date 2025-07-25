import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import Home from "./pages/Home";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
import Payment from "./Components/Payment";
import PrivateRoute from "./Components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./Components/Layout";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import ContactUs from "./pages/ContactUs";
import "./index.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />

            {/* Policy Routes */}
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/refund" element={<RefundPolicy />} />
            <Route path="/contact" element={<ContactUs />} />

            {/* Protected Routes with shared Layout */}
            <Route
              element={
                <PrivateRoute>
                  <Layout /> {/* Layout includes Navbar + <Outlet /> */}
                </PrivateRoute>
              }
            >
              <Route path="/home" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/payment" element={<Payment />} />
            </Route>
          </Routes>
        </>
      </AuthProvider>
    </Router>
  );
}

export default App;
