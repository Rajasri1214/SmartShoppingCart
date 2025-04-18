import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database"; 
import { database } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

const Cart = () => {
  const [scannedItems, setScannedItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

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
  }, []);

  const handlePayNow = () => {
    navigate("/payment");
  };

  return (
    <div className="cart-container">
      <h2>🛒 Scanned Items (Final Payment)</h2>
      {scannedItems.length === 0 ? (
        <p>No scanned items in the cart.</p>
      ) : (
        <ul className="cart-items">
          {scannedItems.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span> 
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}
      <h3 className="total-amount">Total: ₹{totalAmount}</h3>

      {scannedItems.length > 0 && (
        <button className="pay-btn" onClick={handlePayNow}>Pay Now</button>
      )}
    </div>
  );
};

export default Cart;





// This component fetches the cart items from Firebase Realtime Database and displays them.
// It also calculates the total amount of the items in the cart. The cart items are displayed in a list format, and if there are no items, a message is shown instead.
// The total amount is displayed at the bottom of the cart.