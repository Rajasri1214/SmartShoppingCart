import React, { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
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

    // Check if it's a mobile device
    const checkMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  // Customize your UPI deep link
  const upiLink = `upi://pay?pa=pg649599@oksbi&pn=${encodeURIComponent("PRADEEP G")}&am=${totalAmount}&cu=INR`;

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
        <h3>{isMobile ? "Pay via UPI App" : "Pay via UPI or Online Payment"}</h3>
        <p>
          {isMobile
            ? "Click the button below to open your UPI app and complete the payment."
            : "Click the button below to complete your payment."}
        </p>

        <a href={upiLink} target="_blank" rel="noopener noreferrer">
          <button className="pay-btn">
            Pay ₹{totalAmount} Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default Payment;






