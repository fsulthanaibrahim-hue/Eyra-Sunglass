import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

export default function Checkout() {
  const { user } = useContext(AuthContext);
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    full_name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  // ✅ Pre-fill address from user profile when available
  useEffect(() => {
    if (user) {
      setAddress({
        full_name: user.full_name || '',
        phone: user.phone || '',
        address_line1: user.address_line1 || '',
        address_line2: user.address_line2 || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        country: user.country || 'India'
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) { toast.error('Please login to checkout'); navigate('/login'); }
  }, [user, navigate]);

  useEffect(() => {
    if (cartItems.length === 0) { toast.error('Your cart is empty'); navigate('/products'); }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!address.full_name.trim())                          { toast.error('Please enter full name'); return false; }
    if (!address.phone.trim() || address.phone.length < 10) { toast.error('Please enter valid phone number'); return false; }
    if (!address.address_line1.trim())                      { toast.error('Please enter address'); return false; }
    if (!address.city.trim())                               { toast.error('Please enter city'); return false; }
    if (!address.state.trim())                              { toast.error('Please enter state'); return false; }
    if (!address.pincode.trim() || address.pincode.length < 6) { toast.error('Please enter valid pincode'); return false; }
    return true;
  };

  const handlePlaceOrder = async () => {
    // ✅ Check if user profile is complete (using actual user data)
    const requiredFields = ['full_name', 'phone', 'address_line1', 'city', 'state', 'pincode'];
    const isProfileComplete = requiredFields.every(field => user?.[field] && user[field].trim() !== '');
    
    if (!isProfileComplete) {
      toast.error('Please complete your profile before placing an order');
      navigate('/profile', { state: { from: '/checkout' } });
      return;
    }

    if (!validateForm()) return;
    setLoading(true);
    try {
      const token = localStorage.getItem('access');
      if (!token) { toast.error('Please login again'); navigate('/login'); return; }

      const orderData = {
        products: cartItems.map(item => ({ id: item.id, quantity: item.quantity || 1 })),
        address: { ...address, address_line2: address.address_line2 || '' },
        payment_method: 'cod'
      };

      const response = await API.post('/orders/', orderData, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
      });

      clearCart();
      const orderId = response.data.id;
      const totalAmount = getCartTotal();
      toast.success('Order placed successfully!');
      window.location.href = `/order-success?orderId=${orderId}&total=${totalAmount}`;

    } catch (error) {
      console.error('Order error:', error);
      let errorMsg = 'Failed to place order';
      if (error.response?.data?.detail) errorMsg = error.response.data.detail;
      else if (error.response?.data?.message) errorMsg = error.response.data.message;
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const total = getCartTotal();

  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EC", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

        .eyra-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          color: #6B4F3A;
          margin-bottom: 8px;
        }
        .eyra-input {
          width: 100%;
          padding: 12px 16px;
          background: #F7F2EC;
          border: 1px solid rgba(107,79,58,0.2);
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          color: #1C1612;
          outline: none;
          transition: border-color 0.3s, background 0.3s;
          box-sizing: border-box;
        }
        .eyra-input::placeholder { color: #B8A898; }
        .eyra-input:focus {
          border-color: #C9974A;
          background: #fff;
        }

        .place-order-btn {
          width: 100%;
          background: #1C1612;
          color: #F7F2EC;
          padding: 16px;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          transition: background 0.3s, transform 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .place-order-btn:hover:not(:disabled) { background: #6B4F3A; transform: translateY(-1px); }
        .place-order-btn:disabled { background: rgba(28,22,18,0.35); cursor: not-allowed; }

        .back-cart-btn {
          display: block;
          text-align: center;
          margin-top: 14px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #9A8070;
          text-decoration: none;
          transition: color 0.3s;
        }
        .back-cart-btn:hover { color: #C9974A; }

        .order-item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid rgba(107,79,58,0.07);
        }
        .order-item-row:last-child { border-bottom: none; }

        @keyframes eyra-spin { to { transform: rotate(360deg); } }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Title */}
        <div style={{ marginBottom: "40px", paddingBottom: "24px", borderBottom: "1px solid rgba(107,79,58,0.1)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "#1C1612", fontStyle: "italic", marginBottom: "6px" }}>
            Checkout
          </h1>
          <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500 }}>
            Almost there — complete your order
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>

          {/* ── Shipping Form ── */}
          <div style={{ background: "#fff", border: "1px solid rgba(107,79,58,0.12)", padding: "36px" }}>

            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "6px" }}>
              Step 01
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 400, color: "#1C1612", fontStyle: "italic", marginBottom: "6px" }}>
              Shipping Address
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#C9974A", marginBottom: "32px" }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Full Name */}
              <div>
                <label className="eyra-label">
                  Full Name <span style={{ color: "#C9974A" }}>*</span>
                </label>
                <input type="text" name="full_name" value={address.full_name}
                  onChange={handleInputChange} className="eyra-input"
                  placeholder="Enter your full name" />
              </div>

              {/* Phone */}
              <div>
                <label className="eyra-label">
                  Phone Number <span style={{ color: "#C9974A" }}>*</span>
                </label>
                <input type="tel" name="phone" value={address.phone}
                  onChange={handleInputChange} className="eyra-input"
                  placeholder="10-digit phone number" maxLength="10" />
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="eyra-label">
                  Address Line 1 <span style={{ color: "#C9974A" }}>*</span>
                </label>
                <input type="text" name="address_line1" value={address.address_line1}
                  onChange={handleInputChange} className="eyra-input"
                  placeholder="House number, Street name" />
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="eyra-label">Address Line 2 <span style={{ color: "#9A8070", fontSize: "9px" }}>(Optional)</span></label>
                <input type="text" name="address_line2" value={address.address_line2}
                  onChange={handleInputChange} className="eyra-input"
                  placeholder="Landmark, Area" />
              </div>

              {/* City / State / Pincode */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label className="eyra-label">City <span style={{ color: "#C9974A" }}>*</span></label>
                  <input type="text" name="city" value={address.city}
                    onChange={handleInputChange} className="eyra-input" placeholder="City" />
                </div>
                <div>
                  <label className="eyra-label">State <span style={{ color: "#C9974A" }}>*</span></label>
                  <input type="text" name="state" value={address.state}
                    onChange={handleInputChange} className="eyra-input" placeholder="State" />
                </div>
                <div>
                  <label className="eyra-label">Pincode <span style={{ color: "#C9974A" }}>*</span></label>
                  <input type="text" name="pincode" value={address.pincode}
                    onChange={handleInputChange} className="eyra-input"
                    placeholder="6-digit pincode" maxLength="6" />
                </div>
              </div>

            </div>
          </div>

          {/* ── Order Summary ── */}
          <div style={{ background: "#fff", border: "1px solid rgba(107,79,58,0.12)", padding: "32px", position: "sticky", top: "90px" }}>

            <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "6px" }}>
              Step 02
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.6rem", fontWeight: 400, color: "#1C1612", fontStyle: "italic", marginBottom: "6px" }}>
              Order Summary
            </h2>
            <div style={{ width: "40px", height: "1px", background: "#C9974A", marginBottom: "24px" }} />

            {/* Items list */}
            <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "20px" }}>
              {cartItems.map((item) => (
                <div key={item.id} className="order-item-row">
                  <span style={{ fontSize: "13px", color: "#6B4F3A", fontWeight: 300, flex: 1, paddingRight: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                    <span style={{ color: "#C9974A", marginLeft: "6px", fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic" }}>×{item.quantity || 1}</span>
                  </span>
                  <span style={{ fontSize: "13px", color: "#1C1612", fontWeight: 500, whiteSpace: "nowrap" }}>
                    ₹{item.price * (item.quantity || 1)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ borderTop: "1px solid rgba(107,79,58,0.1)", paddingTop: "16px", marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span style={{ fontSize: "13px", color: "#6B4F3A", fontWeight: 300 }}>Subtotal</span>
                <span style={{ fontSize: "13px", color: "#1C1612", fontWeight: 500 }}>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: "13px", color: "#6B4F3A", fontWeight: 300 }}>Shipping</span>
                <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500 }}>Free</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(107,79,58,0.1)", paddingTop: "16px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#1C1612", fontWeight: 500 }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontWeight: 600, color: "#1C1612" }}>₹{total}</span>
              </div>
            </div>

            {/* Payment note */}
            <div style={{ background: "#F7F2EC", border: "1px solid rgba(201,151,74,0.2)", padding: "12px 16px", marginBottom: "24px", marginTop: "16px" }}>
              <p style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A", fontWeight: 500 }}>
                💳 Cash on Delivery
              </p>
            </div>

            {/* Place Order */}
            <button onClick={handlePlaceOrder} disabled={loading} className="place-order-btn">
              {loading ? (
                <>
                  <div style={{ width: "16px", height: "16px", border: "2px solid rgba(247,242,236,0.3)", borderTopColor: "#F7F2EC", borderRadius: "50%", animation: "eyra-spin 0.8s linear infinite" }} />
                  Placing Order...
                </>
              ) : (
                'Place Order'
              )}
            </button>

            <Link to="/cart" className="back-cart-btn">← Back to Cart</Link>

          </div>
        </div>
      </div>
    </div>
  );
}