import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Products() {
  const { user, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());

  // ========== LOAD WISHLIST ==========
  useEffect(() => {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        setWishlist(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error('Error loading wishlist:', e);
      }
    }
  }, []);

  // ========== LOAD PRODUCTS ==========
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ========== WISHLIST TOGGLE ==========
  const handleWishlistToggle = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    const newWishlist = new Set(wishlist);
    
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId);
      toast.success("Removed from wishlist");
    } else {
      newWishlist.add(productId);
      toast.success("Added to wishlist");
    }

    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(Array.from(newWishlist)));

    if (user && token) {
      if (newWishlist.has(productId)) {
        API.post('/wishlist/', { product: productId }, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(err => console.error('Sync error:', err));
      }
    }
  };

  const getProductImages = (product) => {
    if (!product) return [];
    const images = [];
    ["image", "image1", "image2", "image3", "image4"].forEach(key => {
      if (product[key]) images.push(product[key]);
    });
    return images.length > 0 ? images : [product.image];
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="min-h-screen" style={{ background: "#F7F2EC" }}>
        <style>{`@keyframes eyra-spin { to { transform: rotate(360deg); } }`}</style>
        <Navbar />
        <div className="flex flex-col justify-center items-center min-h-[60vh]" style={{ gap: "16px" }}>
          <div style={{
            width: "44px", height: "44px",
            border: "2px solid rgba(201,151,74,0.2)",
            borderTopColor: "#C9974A",
            borderRadius: "50%",
            animation: "eyra-spin 0.9s linear infinite"
          }} />
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#6B4F3A" }}>
            Loading Collection
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F7F2EC" }}>

      {/* Inject styles for hover effects */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');
        @keyframes eyra-spin { to { transform: rotate(360deg); } }

        .eyra-prod-card {
          background: #fff;
          border: 1px solid rgba(107,79,58,0.12);
          overflow: hidden;
          transition: transform 0.32s ease, box-shadow 0.32s ease, border-color 0.32s ease;
        }
        .eyra-prod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 40px rgba(28,22,18,0.11);
          border-color: rgba(201,151,74,0.3);
        }
        .eyra-prod-card-img {
          position: relative;
          height: 264px;
          background: #EDE5D8;
          overflow: hidden;
        }
        .eyra-prod-card-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .eyra-prod-card:hover .eyra-prod-card-img img { transform: scale(1.05); }

        .eyra-wish-btn {
          position: absolute;
          top: 12px; right: 12px;
          width: 36px; height: 36px;
          background: rgba(247,242,236,0.92);
          border: 1px solid rgba(201,151,74,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
        }
        .eyra-wish-btn:hover {
          transform: scale(1.1);
          border-color: #C9974A;
          background: #fff;
        }
        .eyra-wish-btn.active { border-color: #e05050; background: #fff0f0; }
      `}</style>

      <Navbar />

      {/* ── Page Header ── */}
      <section className="pt-28 pb-14 px-4 text-center" style={{ background: "#1C1612" }}>
        <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "14px" }}>
          EYRA Collection
        </p>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 300, color: "#F7F2EC", fontStyle: "italic", marginBottom: "18px" }}>
          Our Products
        </h1>
        <div style={{ width: "50px", height: "1px", background: "#C9974A", margin: "0 auto" }} />
      </section>

      {/* ── Products Section ── */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8" style={{ paddingTop: "40px" }}>

        {/* Count */}
        <div className="max-w-7xl mx-auto mb-8">
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A" }}>
            <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontStyle: "italic", color: "#C9974A", marginRight: "6px" }}>
              {products.length}
            </span>
            styles available
          </p>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => {
              const images = getProductImages(product);
              const inWishlist = wishlist.has(product.id);

              return (
                <div key={product.id} className="eyra-prod-card">
                  <Link to={`/products/${product.id}`} style={{ textDecoration: "none", display: "block" }}>

                    {/* Image */}
                    <div className="eyra-prod-card-img">
                      <img
                        src={`http://127.0.0.1:8000${images[0]}`}
                        alt={product.name}
                      />
                      <button
                        onClick={(e) => handleWishlistToggle(e, product.id)}
                        className={`eyra-wish-btn${inWishlist ? " active" : ""}`}
                      >
                        {inWishlist ? (
                          <svg style={{ width: "15px", height: "15px", color: "#e05050" }} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                          </svg>
                        ) : (
                          <svg style={{ width: "15px", height: "15px", color: "#6B4F3A" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4" style={{ borderTop: "1px solid rgba(107,79,58,0.08)" }}>
                      <h2 style={{
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: "1.15rem",
                        fontWeight: 400,
                        color: "#1C1612",
                        marginBottom: "6px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>
                        {product.name}
                      </h2>
                      <p style={{ fontSize: "1rem", fontWeight: 600, color: "#6B4F3A", letterSpacing: "0.5px" }}>
                        <span style={{ fontSize: "12px", fontWeight: 300, color: "#9A8070", marginRight: "1px" }}>₹</span>
                        {product.price}
                      </p>
                    </div>

                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}