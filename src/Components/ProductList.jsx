import "../styles/ProductList.css";
const products = [
  { id: "p1", name: "Milk", price: 20 },
  { id: "p2", name: "Rice", price: 120 },
  { id: "p3", name: "Diary Milk", price: 90 },
  { id: "p4", name: "Bread", price: 30 },
];

const ProductList = () => {
  return (
    <div className="products-container">
      <h2 style={{ color: "#4a148c" }}>Available Products in Shop</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

//Just for show the what are items available in the shop.