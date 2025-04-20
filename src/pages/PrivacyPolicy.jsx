// src/pages/PrivacyPolicy.jsx
import "../styles/Policy.css";

const PrivacyPolicy = () => (
  <div className="info-container">
    <h1 className="info-heading">Privacy Policy</h1>
    <p className="info-text">
      At SMART CART APP, we value your privacy. This policy explains how we collect, use, and protect your data.

      <h1 className="info-heading">What We Collect:</h1>

        Name and contact information (email/phone)

        RFID-based cart data (scanned product UIDs, names, prices)

        Payment details (only for processing, not stored)

      <h1 className="info-heading">How We Use It:</h1>

        To display products scanned from the smart cart on the website

        To generate bills and enable payment

        To send payment confirmation and receipts
    </p>
  </div>
);

export default PrivacyPolicy;
