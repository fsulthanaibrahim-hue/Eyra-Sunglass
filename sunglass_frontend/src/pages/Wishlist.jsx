import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

export default function Wishlist() {
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadWishlist(); }, []);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const saved = localStorage.getItem('wishlist');
      const ids = saved ? JSON.parse(saved) : [];
      if (ids.length === 0) { setWishlistItems([]); setLoading(false); return; }
      const products = [];
      for (const id of ids) {
        try {
          const res = await API.get(`products/${id}/`);
          products.push(res.data);
        } catch (err) { console.error(`Error fetching product ${id}:`, err); }
      }
      setWishlistItems(products);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (productId) => {
    const saved = localStorage.getItem('wishlist');
    const ids = saved ? JSON.parse(saved) : [];
    const newIds = ids.filter(id => Number(id) !== Number(productId));
    localStorage.setItem('wishlist', JSON.stringify(newIds));
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    window.dispatchEvent(new Event('storage'));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    removeItem(product.id);
    toast.success(`"${product.name}" added to cart`);
  };

  const getImageUrl = (product) => {
    if (!product?.image) return '/placeholder.jpg';
    if (product.image.startsWith('http')) return product.image;
    return `http://127.0.0.1:8000${product.image}`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <style>{`@keyframes eyra-spin { to { transform: rotate(360deg); } }`}</style>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
          <div style={{ width: "44px", height: "44px", border: "2px solid rgba(201,151,74,0.2)", borderTopColor: "#C9974A", borderRadius: "50%", animation: "eyra-spin 0.9s linear infinite" }} />
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#6B4F3A" }}>Loading Wishlist</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');`}</style>
        <Navbar />
        <div style={{ textAlign: "center", paddingTop: "140px", padding: "140px 24px 80px" }}>
          <svg style={{ width: "72px", height: "72px", color: "rgba(201,151,74,0.3)", margin: "0 auto 28px", display: "block" }} fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontStyle: "italic", color: "#6B4F3A", marginBottom: "10px" }}>Your wishlist is empty</p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#9A8070", fontWeight: 300, marginBottom: "36px", letterSpacing: "1px" }}>Save items you love and find them here</p>
          <Link to="/products" style={{
            display: "inline-block",
            background: "#1C1612", color: "#F7F2EC",
            padding: "14px 36px",
            fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500,
            textDecoration: "none"
          }}>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  // ── Main Page ──
  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EC", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes eyra-spin { to { transform: rotate(360deg); } }

        .wl-card {
          background: #fff;
          border: 1px solid rgba(107,79,58,0.12);
          overflow: hidden;
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
        }
        .wl-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(28,22,18,0.1);
          border-color: rgba(201,151,74,0.3);
        }
        .wl-card-img {
          height: 240px;
          background: #EDE5D8;
          overflow: hidden;
        }
        .wl-card-img img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.5s ease;
        }
        .wl-card:hover .wl-card-img img { transform: scale(1.05); }

        .wl-btn-cart {
          width: 100%;
          background: #1C1612;
          color: #F7F2EC;
          padding: 12px;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          transition: background 0.3s;
        }
        .wl-btn-cart:hover { background: #6B4F3A; }

        .wl-btn-remove {
          width: 100%;
          background: transparent;
          color: #9A8070;
          padding: 11px;
          border: 1px solid rgba(107,79,58,0.2);
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 400;
          transition: color 0.3s, border-color 0.3s;
        }
        .wl-btn-remove:hover { color: #c0392b; border-color: #c0392b; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Title + Count */}
        <div style={{ marginBottom: "36px", paddingBottom: "24px", borderBottom: "1px solid rgba(107,79,58,0.1)" }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, color: "#1C1612", fontStyle: "italic", marginBottom: "8px" }}>
            My Wishlist
          </h1>
          <p style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.3rem", fontStyle: "italic", color: "#C9974A", marginRight: "6px" }}>
              {wishlistItems.length}
            </span>
            saved {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {wishlistItems.map((item) => (
            <div key={item.id} className="wl-card">

              <Link to={`/products/${item.id}`} style={{ textDecoration: "none", display: "block" }}>
                <div className="wl-card-img">
                  <img src={getImageUrl(item)} alt={item.name} />
                </div>
              </Link>

              <div style={{ padding: "18px 20px 20px", borderTop: "1px solid rgba(107,79,58,0.08)" }}>
                <Link to={`/products/${item.id}`} style={{ textDecoration: "none" }}>
                  <h3 style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "1.15rem", fontWeight: 400, color: "#1C1612",
                    marginBottom: "6px", whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis"
                  }}>
                    {item.name}
                  </h3>
                </Link>

                <p style={{ fontSize: "1rem", fontWeight: 600, color: "#6B4F3A", letterSpacing: "0.5px", marginBottom: "18px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 300, color: "#9A8070", marginRight: "1px" }}>₹</span>
                  {item.price}
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button onClick={() => handleAddToCart(item)} className="wl-btn-cart">Add to Cart</button>
                  <button onClick={() => removeItem(item.id)} className="wl-btn-remove">Remove</button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}