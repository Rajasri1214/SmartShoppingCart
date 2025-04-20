// src/pages/TermsAndConditions.jsx
import "../styles/Policy.css";

function TermsAndConditions() {
  return (
    <div className="info-container">
      <h1 className="info-heading">Terms & Conditions</h1>
      <p className="info-text">
        {/* Add more content about your project and terms here */}
        Welcome to SMART CART APP! These Terms and Conditions outline the rules and regulations for using our website and services.

        By accessing this website, you accept these Terms and Conditions. Do not continue to use SMART CART APP if you do not agree with the terms.

        <h1 className="info-heading">Our Services</h1>
        SMART CART APP provides a smart shopping cart system using RFID technology. Products are detected when added to the physical cart and displayed on our website in real-time. Customers can review the items and complete payment directly through the website.

        <h1 className="info-heading">Accuracy of Information</h1>
        While we strive to keep all product and billing information accurate and updated, we are not liable for any discrepancies arising due to technical issues or human error.

        <h1 className="info-heading">Use of Website</h1>
        You may use this website for lawful purposes only. Unauthorized use may give rise to a claim for damages and/or be a criminal offense.

        <h1 className="info-heading">Intellectual Property</h1>
        All content on this website is owned by SMART CART APP. Reproduction or redistribution of any material without written permission is strictly prohibited.

        <h1 className="info-heading">Governing Law</h1>
        These terms shall be governed in accordance with the laws of India. Any dispute shall be subject to the jurisdiction of Namakkal, Tamil Nadu.
      </p>
    </div>
  );
}

export default TermsAndConditions;
