import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [buyingNow, setBuyingNow] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // ========== WISHLIST ==========
  const loadWishlist = () => {
    try {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed.map(id => Number(id)) : [];
      }
    } catch (e) { console.error('Error loading wishlist:', e); }
    return [];
  };

  const saveWishlist = (arr) => {
    try { localStorage.setItem('wishlist', JSON.stringify(arr)); }
    catch (e) { console.error('Error saving wishlist:', e); }
  };

  const checkWishlist = (productId) => {
    const wl = loadWishlist();
    setIsInWishlist(wl.includes(Number(productId)));
  };

  const toggleWishlist = (productId) => {
    const numericId = Number(productId);
    let wl = loadWishlist();
    if (wl.includes(numericId)) {
      wl = wl.filter(i => i !== numericId);
      setIsInWishlist(false);
      toast.success("Removed from wishlist");
    } else {
      wl.push(numericId);
      setIsInWishlist(true);
      toast.success("Added to wishlist");
    }
    saveWishlist(wl);
  };

  // ========== MIGRATE OLD DATA ==========
  useEffect(() => {
    const oldData = localStorage.getItem('localWishlist');
    const newData = localStorage.getItem('wishlist');
    if (oldData && !newData) {
      try {
        const parsed = JSON.parse(oldData);
        if (Array.isArray(parsed)) localStorage.setItem('wishlist', oldData);
      } catch (e) { console.error('Error migrating:', e); }
    }
  }, []);

  // ========== LOAD PRODUCT ==========
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`products/${id}/`);
        setProduct(response.data);
        checkWishlist(id);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // ========== ADD TO CART ==========
  const handleAddToCart = () => {
    if (!product) return;
    setAddingToCart(true);
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image, 
      quantity: 1 
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    toast.success("Added to cart!");
    setAddingToCart(false);
  };

  // ========== BUY NOW (Direct to Checkout) ==========
  const handleBuyNow = () => {
    if (!user) {
      toast((t) => (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "8px" }}>
          <p style={{ fontFamily: "'Jost',sans-serif", fontWeight: 500 }}>Please login to continue</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => { toast.dismiss(t.id); navigate('/login'); }}
              style={{ background: "#1C1612", color: "#F7F2EC", padding: "8px 20px", border: "none", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "12px", letterSpacing: "2px" }}>
              Login
            </button>
            <button onClick={() => toast.dismiss(t.id)}
              style={{ background: "transparent", color: "#6B4F3A", padding: "8px 20px", border: "1px solid rgba(107,79,58,0.3)", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "12px", letterSpacing: "2px" }}>
              Cancel
            </button>
          </div>
        </div>
      ), { duration: 5000, position: 'top-center' });
      return;
    }

    setBuyingNow(true);
    
    // ✅ Add to cart first
    addToCart({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      image: product.image, 
      quantity: 1 
    });
    
    // ✅ Then go directly to checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 300);
  };

  const handleWishlistToggle = () => toggleWishlist(Number(id));

  // ========== HELPERS ==========
  const getProductImages = (product) => {
    if (!product) return [];
    if (product.images && Array.isArray(product.images) && product.images.length > 0) return product.images;
    const imageFields = [];
    ['image', 'image1', 'image2', 'image3', 'image4'].forEach(field => {
      if (product[field]) imageFields.push(product[field]);
    });
    return imageFields.length > 0 ? imageFields : ['/placeholder.jpg'];
  };

  const imageUrl = (img) => {
    if (!img) return '/placeholder.jpg';
    if (img.startsWith('http')) return img;
    return `http://127.0.0.1:8000${img}`;
  };

  // ========== LOADING ==========
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <style>{`@keyframes eyra-spin { to { transform: rotate(360deg); } }`}</style>
        <Navbar />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
          <div style={{ width: "44px", height: "44px", border: "2px solid rgba(201,151,74,0.2)", borderTopColor: "#C9974A", borderRadius: "50%", animation: "eyra-spin 0.9s linear infinite" }} />
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#6B4F3A" }}>Loading</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <Navbar />
        <div style={{ textAlign: "center", paddingTop: "120px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2rem", fontStyle: "italic", color: "#6B4F3A", marginBottom: "20px" }}>Product not found</p>
          <button onClick={() => navigate('/products')}
            style={{ background: "#1C1612", color: "#F7F2EC", padding: "14px 32px", border: "none", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" }}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productImages = getProductImages(product);

  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EC", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes eyra-spin { to { transform: rotate(360deg); } }
        @keyframes slideDown {
          from { transform: translate(-50%, -110%); opacity: 0; }
          to   { transform: translate(-50%, 0);    opacity: 1; }
        }

        .eyra-thumb {
          flex-shrink: 0;
          width: 76px; height: 76px;
          overflow: hidden;
          border: 1px solid rgba(107,79,58,0.18);
          cursor: pointer;
          transition: border-color 0.25s, opacity 0.25s;
          opacity: 0.65;
        }
        .eyra-thumb.active { border-color: #C9974A; opacity: 1; }
        .eyra-thumb:hover  { opacity: 1; border-color: rgba(201,151,74,0.5); }
        .eyra-thumb img    { width: 100%; height: 100%; object-fit: cover; display: block; }

        .eyra-arrow-btn {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          background: rgba(247,242,236,0.9);
          border: 1px solid rgba(201,151,74,0.25);
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s;
          backdrop-filter: blur(4px);
        }
        .eyra-arrow-btn:hover { background: #fff; border-color: #C9974A; }

        .eyra-wish-btn {
          position: absolute;
          top: 14px; right: 14px;
          background: rgba(247,242,236,0.92);
          border: 1px solid rgba(201,151,74,0.2);
          width: 42px; height: 42px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
          backdrop-filter: blur(4px);
          z-index: 10;
        }
        .eyra-wish-btn:hover   { transform: scale(1.1); border-color: #C9974A; background: #fff; }
        .eyra-wish-btn.active  { border-color: #e05050; background: #fff0f0; }

        .eyra-btn-primary {
          width: 100%;
          background: #1C1612;
          color: #F7F2EC;
          padding: 16px;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          transition: background 0.3s, transform 0.2s;
        }
        .eyra-btn-primary:hover:not(:disabled) { background: #6B4F3A; transform: translateY(-1px); }
        .eyra-btn-primary:disabled { background: rgba(28,22,18,0.35); cursor: not-allowed; }

        .eyra-btn-secondary {
          width: 100%;
          background: transparent;
          color: #1C1612;
          padding: 15px;
          border: 1px solid rgba(28,22,18,0.4);
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          transition: border-color 0.3s, color 0.3s, transform 0.2s;
        }
        .eyra-btn-secondary:hover:not(:disabled) { border-color: #C9974A; color: #C9974A; transform: translateY(-1px); }
        .eyra-btn-secondary:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <Navbar />

      {/* Success banner */}
      {showSuccess && (
        <div style={{
          position: "fixed", top: "80px", left: "50%",
          transform: "translateX(-50%)",
          background: "#1C1612", color: "#F7F2EC",
          padding: "14px 36px",
          fontFamily: "'Jost',sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase",
          zIndex: 50,
          animation: "slideDown 0.4s ease-out",
          borderBottom: "2px solid #C9974A"
        }}>
          Added to cart successfully!
        </div>
      )}

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "100px 24px 80px" }}>

        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          <button onClick={() => navigate('/products')}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500 }}>
            Products
          </button>
          <span style={{ color: "rgba(107,79,58,0.4)", fontSize: "12px" }}>—</span>
          <span style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A", fontWeight: 400 }}>
            {product.name}
          </span>
        </div>

        {/* Main Card */}
        <div style={{ background: "#fff", border: "1px solid rgba(107,79,58,0.1)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>

            {/* ── Left: Image Gallery ── */}
            <div style={{ padding: "40px", borderRight: "1px solid rgba(107,79,58,0.08)" }}>

              {/* Main image */}
              <div style={{ position: "relative", background: "#EDE5D8", height: "480px", overflow: "hidden" }}>
                <img
                  src={imageUrl(productImages[selectedImage])}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "opacity 0.3s" }}
                />

                {/* Wishlist */}
                <button onClick={handleWishlistToggle} className={`eyra-wish-btn${isInWishlist ? " active" : ""}`}>
                  {isInWishlist ? (
                    <svg style={{ width: "18px", height: "18px", color: "#e05050" }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg style={{ width: "18px", height: "18px", color: "#6B4F3A" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </button>

                {/* Arrows */}
                {productImages.length > 1 && (
                  <>
                    <button className="eyra-arrow-btn" style={{ left: "12px" }}
                      onClick={() => setSelectedImage(prev => (prev - 1 + productImages.length) % productImages.length)}>
                      <svg style={{ width: "16px", height: "16px", color: "#1C1612" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button className="eyra-arrow-btn" style={{ right: "12px" }}
                      onClick={() => setSelectedImage(prev => (prev + 1) % productImages.length)}>
                      <svg style={{ width: "16px", height: "16px", color: "#1C1612" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div style={{ display: "flex", gap: "10px", marginTop: "16px", overflowX: "auto", paddingBottom: "4px" }}>
                  {productImages.map((img, idx) => (
                    <button key={idx} className={`eyra-thumb${selectedImage === idx ? " active" : ""}`}
                      onClick={() => setSelectedImage(idx)}>
                      <img src={imageUrl(img)} alt="" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Product Info ── */}
            <div style={{ padding: "40px", display: "flex", flexDirection: "column" }}>

              {/* Label */}
              <p style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "14px" }}>
                EYRA Eyewear
              </p>

              {/* Name */}
              <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, color: "#1C1612", marginBottom: "6px", lineHeight: 1.2 }}>
                {product.name}
              </h1>

              {/* Gold divider */}
              <div style={{ width: "50px", height: "1px", background: "#C9974A", margin: "16px 0 24px" }} />

              {/* Price */}
              <div style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid rgba(107,79,58,0.1)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.6rem", fontWeight: 600, color: "#1C1612" }}>
                    ₹{product.price}
                  </span>
                  <span style={{ fontSize: "12px", color: "#9A8070", letterSpacing: "1px" }}>Incl. all taxes</span>
                </div>
              </div>

              {/* Description */}
              <div style={{ marginBottom: "36px", flex: 1 }}>
                <p style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#6B4F3A", fontWeight: 500, marginBottom: "12px" }}>
                  Description
                </p>
                <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#5A4A3A", fontWeight: 300 }}>
                  {product.description || "No description available"}
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button onClick={handleBuyNow} disabled={buyingNow} className="eyra-btn-primary">
                  {buyingNow ? 'Processing...' : 'Buy Now'}
                </button>
                <button onClick={handleAddToCart} disabled={addingToCart} className="eyra-btn-secondary">
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}