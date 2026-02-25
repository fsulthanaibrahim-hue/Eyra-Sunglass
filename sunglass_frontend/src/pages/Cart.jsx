import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart(); // ✅ cartCount removed – we compute it ourselves
  const [total, setTotal] = useState(0);

  // Calculate total whenever cart changes
  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) =>
      sum + (item.price * (item.quantity || 1)), 0
    );
    setTotal(newTotal);
  }, [cartItems]);

  // Calculate total number of items (sum of quantities)
  const itemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
    toast.success('Quantity updated');
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    toast.success('Item removed from cart');
  };

  const getImageUrl = (image) => {
    if (!image) return '/placeholder.jpg';
    if (image.startsWith('http')) return image;
    return `http://127.0.0.1:8000${image}`;
  };

  // ── Empty State ──
  if (cartItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');`}</style>
        <Navbar />
        <div style={{ textAlign: "center", padding: "160px 24px 80px" }}>
          <svg style={{ width: "68px", height: "68px", color: "rgba(201,151,74,0.3)", margin: "0 auto 28px", display: "block" }} fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontStyle: "italic", color: "#6B4F3A", marginBottom: "10px" }}>Your cart is empty</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#9A8070", fontWeight: 300, marginBottom: "36px", letterSpacing: "1px" }}>Add items you love to get started</p>
          <Link to="/products" style={{
            display: "inline-block",
            background: "#1C1612", color: "#F7F2EC",
            padding: "14px 36px",
            fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500,
            textDecoration: "none"
          }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Cart ──
  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EC", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .cart-row {
          background: #fff;
          border: 1px solid rgba(107,79,58,0.12);
          display: flex;
          gap: 20px;
          padding: 20px;
          transition: border-color 0.3s;
        }
        .cart-row:hover { border-color: rgba(201,151,74,0.3); }

        .cart-qty-select {
          appearance: none;
          -webkit-appearance: none;
          background: #F7F2EC;
          border: 1px solid rgba(107,79,58,0.2);
          padding: 6px 28px 6px 12px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #1C1612;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B4F3A' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          transition: border-color 0.3s;
        }
        .cart-qty-select:focus { border-color: #C9974A; }

        .cart-remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9A8070;
          padding: 6px 0;
          transition: color 0.3s;
        }
        .cart-remove-btn:hover { color: #c0392b; }

        .checkout-btn {
          display: block;
          width: 100%;
          background: #1C1612;
          color: #F7F2EC;
          text-align: center;
          padding: 16px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
          border: none;
          cursor: pointer;
        }
        .checkout-btn:hover { background: #6B4F3A; transform: translateY(-1px); }

        .continue-btn {
          display: block;
          text-align: center;
          margin-top: 14px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #9A8070;
          text-decoration: none;
          transition: color 0.3s;
        }
        .continue-btn:hover { color: #C9974A; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Title */}
        <div style={{ marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid rgba(107,79,58,0.1)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "#1C1612", fontStyle: "italic", marginBottom: "8px" }}>
            Shopping Cart
          </h1>
          <p style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#C9974A", marginRight: "6px" }}>
              {itemCount}
            </span>
            {itemCount === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>

          {/* ── Cart Items ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-row">

                {/* Image */}
                <Link to={`/products/${item.id}`} style={{ flexShrink: 0 }}>
                  <div style={{ width: "96px", height: "96px", background: "#EDE5D8", overflow: "hidden" }}>
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                      onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
                      onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                    />
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.15rem", fontWeight: 400, color: "#1C1612", marginBottom: "4px" }}>
                      {item.name}
                    </h3>
                  </Link>
                  <p style={{ fontSize: "1rem", fontWeight: 600, color: "#6B4F3A", letterSpacing: "0.5px", marginBottom: "16px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 300, color: "#9A8070", marginRight: "1px" }}>₹</span>
                    {item.price}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <select
                      value={item.quantity || 1}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      className="cart-qty-select"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                    <button onClick={() => handleRemove(item.id)} className="cart-remove-btn">
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line Total */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontWeight: 600, color: "#1C1612" }}>
                    ₹{item.price * (item.quantity || 1)}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* ── Order Summary ── */}
          <div style={{ background: "#fff", border: "1px solid rgba(107,79,58,0.12)", padding: "32px", position: "sticky", top: "90px" }}>

            {/* Summary title */}
            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "6px" }}>
              Summary
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 400, color: "#1C1612", fontStyle: "italic", marginBottom: "24px" }}>
              Order Details
            </h2>

            {/* Gold divider */}
            <div style={{ width: "40px", height: "1px", background: "#C9974A", marginBottom: "24px" }} />

            {/* Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#6B4F3A", fontWeight: 300 }}>Subtotal ({itemCount} items)</span>
                <span style={{ fontSize: "13px", color: "#1C1612", fontWeight: 500 }}>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "#6B4F3A", fontWeight: 300 }}>Shipping</span>
                <span style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500 }}>Free</span>
              </div>
            </div>

            {/* Total */}
            <div style={{ borderTop: "1px solid rgba(107,79,58,0.1)", paddingTop: "20px", marginBottom: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#1C1612", fontWeight: 500 }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 600, color: "#1C1612" }}>₹{total}</span>
              </div>
            </div>

            {/* Buttons */}
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="continue-btn">
              Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}