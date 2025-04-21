import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import QRCODE from "../assets/images/qr.jpg";
import "../styles/Payment.css";

const Payment = () => {
  const [scannedItems, setScannedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const scannedRef = ref(database, "scannedItems");
    onValue(scannedRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.values(data);
        setScannedItems(itemsArray);
        const total = itemsArray.reduce((sum, item) => sum + item.price, 0);
        setTotalAmount(total);
      } else {
        setScannedItems([]);
        setTotalAmount(0);
      }
    });

    const checkMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  const upiLink = `upi://pay?pa=rajasri12567@oksbi&pn=${encodeURIComponent(
    "Rajasri R"
  )}&am=${totalAmount}&cu=INR`;

  return (
    <div className="payment-page">
      <h2 style={{ color: "#4a148c" }}>🧾 Final Bill & Payment</h2>

      {scannedItems.length === 0 ? (
        <p>No scanned items found.</p>
      ) : (
        <div className="bill-container">
          <ul className="item-list">
            {scannedItems.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{totalAmount}</h3>
        </div>
      )}

      <div className="payment-section">
        <h3>{isMobile ? "Pay via UPI App" : "Scan QR or Use UPI ID"}</h3>
        <p>
          {isMobile
            ? "Click the button below to open your UPI app and complete the payment."
            : "Scan the QR code or copy the UPI ID to pay using your UPI app."}
        </p>

        {isMobile ? (
          <a href={upiLink} target="_blank" rel="noopener noreferrer">
            <button className="pay-btn">Pay ₹{totalAmount} Now</button>
          </a>
        ) : (
          <div className="qr-code-section">
            <img
              src={QRCODE}
              alt="Static UPI QR Code"
              style={{ width: "200px", height: "200px", marginTop: "1rem" }}
            />
            {/* <p style={{ marginTop: "0.5rem" }}>
              UPI ID: <strong>pg649599@oksbi</strong>
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
