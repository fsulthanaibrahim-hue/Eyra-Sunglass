import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Award, Truck, Headphones, ArrowRight, ChevronLeft, ChevronRight, 
  Star, Shield, Clock, Heart, Eye, Sparkles, Zap 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const scrollBrands = (dir) => {
    if (sliderRef.current) {
      const scrollAmount = dir === 'left' ? -400 : 400;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing: ${email}`);
      setEmail("");
    }
  };

  const categories = ["All", "Men", "Women", "Kids"];

  const brandData = [
    { img: "/images/home19.jpg", name: "Luminary",   desc: "Luxury Frames",      rating: 4.8, products: 24 },
    { img: "/images/home18.jpg", name: "Noir Optic",  desc: "Premium Collection", rating: 4.7, products: 18 },
    { img: "/images/home17.jpg", name: "Solara",     desc: "Signature Series",   rating: 4.9, products: 32 },
    { img: "/images/home14.jpg", name: "Vantage",    desc: "Sport & Style",      rating: 4.6, products: 15 },
    { img: "/images/home15.jpg", name: "Auric",      desc: "Gold Edition",       rating: 4.8, products: 12 },
    { img: "/images/home16.jpg", name: "Eclipse",    desc: "Dark Collection",    rating: 4.5, products: 21 },
  ];

  const catSmall = [
    { title: "Smart Glasses",   img: "/images/home5.jpg", icon: <Zap size={15} />, link: "/products?category=smart" },
    { title: "Powered Lenses",  img: "/images/home7.jpg", icon: <Sparkles size={15} />, link: "/products?category=powered" },
    { title: "Contact Lenses",  img: "/images/home8.jpg", icon: <Eye size={15} />, link: "/products?category=contact" },
    { title: "Reading Glasses", img: "/images/home9.jpg", icon: <Heart size={15} />, link: "/products?category=reading" },
  ];

  const testimonials = [
    { name: "Priya S.",  text: "Best sunglasses I've ever owned! The quality is exceptional and the UV protection is top-notch.", rating: 5, date: "2 weeks ago" },
    { name: "Rahul M.", text: "Fast shipping and amazing customer service. Highly recommended!", rating: 5, date: "1 month ago" },
    { name: "Anita K.", text: "The gold frames are stunning. Got so many compliments!", rating: 4, date: "3 weeks ago" },
  ];

  const features = [
    { icon: <Award size={26} />,      title: "Premium Quality", desc: "Handcrafted with precision using the finest materials" },
    { icon: <Truck size={26} />,      title: "Fast Shipping",   desc: "Free delivery on orders over ₹999" },
    { icon: <Headphones size={26} />, title: "24/7 Support",    desc: "Round-the-clock customer service" },
    { icon: <Shield size={26} />,     title: "2 Year Warranty", desc: "Complete peace of mind" },
    { icon: <Clock size={26} />,      title: "Easy Returns",    desc: "30-day hassle-free returns" },
    { icon: <Star size={26} />,       title: "Best Price",      desc: "Premium quality at affordable prices" },
  ];

  return (
    <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* Animations */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }

        .animate-fade-up { animation: fadeUp 0.8s ease forwards; }
        .animate-fade-up-delay { animation: fadeUp 0.8s ease 0.2s forwards; opacity: 0; }
        .animate-pulse-gold { animation: spinSlow 3s linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }

        /* Card Hover Effects */
        .hover-card {
          transition: all 0.4s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        .hover-card:hover .hover-scale {
          transform: scale(1.1);
        }
        .hover-card:hover .hover-show {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .hover-zoom {
          overflow: hidden;
        }
        .hover-zoom img {
          transition: transform 0.7s ease;
        }
        .hover-zoom:hover img {
          transform: scale(1.1);
        }

        /* Category Tabs */
        .cat-tab {
          padding: 12px 32px;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          border: 1px solid rgba(107,79,58,0.2);
          background: transparent;
          color: #6B4F3A;
          cursor: pointer;
          transition: all 0.3s;
          border-radius: 0;
        }
        .cat-tab.active, .cat-tab:hover {
          background: #1C1612;
          color: #F7F2EC;
          border-color: #1C1612;
        }

        /* Feature Cards - FIXED */
        .feature-card {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(201,151,74,0.2);
          padding: 36px 28px;
          transition: all 0.3s;
          cursor: pointer;
          border-radius: 8px;
        }
        .feature-card:hover {
          border-color: #C9974A;
          background: rgba(255,255,255,0.15);
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .feature-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201,151,74,0.2);
          border: 1px solid rgba(201,151,74,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #C9974A;
          margin-bottom: 18px;
          transition: all 0.3s;
        }
        .feature-card:hover .feature-icon {
          background: #C9974A;
          color: #1C1612;
          transform: scale(1.1);
        }
        .feature-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          color: #FFFFFF;
          margin-bottom: 8px;
          font-weight: 500;
        }
        .feature-desc {
          font-size: 0.9rem;
          color: rgba(255,255,255,0.8);
          font-weight: 300;
          line-height: 1.6;
        }

        /* Testimonial Cards */
        .testimonial-card {
          background: rgba(247,242,236,0.05);
          border: 1px solid rgba(201,151,74,0.14);
          padding: 32px 26px;
          transition: all 0.3s;
          border-radius: 8px;
        }
        .testimonial-card:hover {
          border-color: rgba(201,151,74,0.4);
          background: rgba(247,242,236,0.08);
          transform: translateY(-4px);
        }

        /* Brands Slider */
        #brands-slider {
          scrollbar-width: none;
          -ms-overflow-style: none;
          cursor: grab;
        }
        #brands-slider::-webkit-scrollbar {
          display: none;
        }
        #brands-slider:active {
          cursor: grabbing;
        }

        .brand-card {
          flex-shrink: 0;
          width: 280px;
          position: relative;
          cursor: pointer;
        }
        .brand-card:hover .brand-glow {
          opacity: 0.5 !important;
        }
        .brand-card:hover .brand-image {
          transform: scale(1.1) !important;
        }
        .brand-card:hover .brand-cta {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .brand-card:hover .brand-line {
          width: 40px !important;
        }

        .brand-glow {
          position: absolute;
          inset: -4px;
          background: linear-gradient(135deg, #C9974A, #6B4F3A);
          border-radius: 144px 144px 18px 18px;
          opacity: 0;
          filter: blur(12px);
          transition: opacity 0.5s;
          z-index: 0;
        }
        .brand-image {
          transition: transform 0.7s;
        }
        .brand-cta {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.35s, transform 0.35s;
        }
        .brand-line {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #C9974A, transparent);
          transition: width 0.45s;
        }

        .arrow-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(201,151,74,0.08);
          border: 1px solid rgba(201,151,74,0.3);
          color: #C9974A;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          transition: all 0.3s;
        }
        .arrow-btn:hover {
          background: #C9974A;
          color: #1C1612;
          transform: scale(1.1);
        }

        /* Footer Links */
        .footer-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 13px;
          color: rgba(247,242,236,0.4);
          font-weight: 300;
          transition: color 0.3s;
          padding: 0;
          display: block;
          margin-bottom: 10px;
          text-align: left;
        }
        .footer-link:hover {
          color: #C9974A;
          transform: translateX(5px);
        }

        /* Newsletter Input */
        .news-input {
          flex: 1;
          padding: 15px 20px;
          background: #fff;
          border: 1px solid rgba(107,79,58,0.2);
          font-size: 14px;
          color: #1C1612;
          outline: none;
          transition: border-color 0.3s;
          border-radius: 0;
        }
        .news-input:focus {
          border-color: #C9974A;
        }
        .news-input::placeholder {
          color: #B8A898;
        }

        /* Section Styles */
        .section-label {
          font-size: 11px;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: #C9974A;
          font-weight: 500;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 300;
          color: #1C1612;
        }
        .section-title-italic {
          font-style: italic;
          color: #C9974A;
        }
        .section-divider {
          width: 50px;
          height: 1px;
          background: #C9974A;
          margin: 16px auto 0;
        }
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#F7F2EC] pt-20">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-[radial-gradient(circle,rgba(201,151,74,0.1)_0%,transparent_70%)] rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(107,79,58,0.08)_0%,transparent_70%)] rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-40 right-40 w-64 h-64 bg-[radial-gradient(circle,rgba(201,151,74,0.08)_0%,transparent_70%)] rounded-full animate-pulse delay-700"></div>

        {/* Decorative Lines */}
        <div className="absolute left-0 top-0 w-1 h-32 bg-gradient-to-b from-[#C9974A] to-transparent"></div>
        <div className="absolute right-0 bottom-0 w-1 h-32 bg-gradient-to-t from-[#C9974A] to-transparent"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-2.5 border border-[#C9974A]/20 mb-8">
                <span className="w-2 h-2 bg-[#C9974A] rounded-full animate-pulse-gold"></span>
                <span className="text-xs tracking-[0.2em] text-[#C9974A] font-semibold uppercase">New Collection 2025</span>
              </div>
              
              <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-7xl font-light leading-tight text-[#1C1612] mb-6">
                Discover Your<br />
                <span className="italic text-[#C9974A]">Signature</span> Style
              </h1>
              
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed max-w-lg mb-9">
                Elevate your look with premium eyewear crafted for comfort, clarity, and advanced UV protection — where design meets vision.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <button 
                  onClick={() => navigate("/products")}
                  className="group bg-[#1C1612] text-[#F7F2EC] px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium flex items-center gap-2 hover:bg-[#C9974A] transition-all duration-300"
                >
                  Shop Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#C9974A]/20">
                {[
                  ["25+", "Premium Brands"],
                  ["10k+", "Happy Customers"],
                  ["500+", "Unique Styles"],
                ].map(([stat, label]) => (
                  <div key={label} className="text-center md:text-left">
                    <div className="font-['Cormorant_Garamond',serif] text-3xl font-semibold italic text-[#C9974A]">{stat}</div>
                    <div className="text-[10px] tracking-wider uppercase text-[#9A8070] mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div 
              className="relative group cursor-pointer animate-fade-up-delay"
              onClick={() => navigate("/products")}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9974A] to-[#6B4F3A] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9974A]/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img
                src="/images/home2.jpg"
                alt="Premium Sunglasses"
                className="relative rounded-3xl shadow-2xl transform -rotate-3 group-hover:rotate-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#C9974A] text-[#1C1612] p-4 text-center group-hover:scale-110 transition-transform">
                <div className="font-['Cormorant_Garamond',serif] text-2xl font-bold leading-none">40%</div>
                <div className="text-[9px] tracking-widest uppercase mt-1">Limited Offer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SHOP BY CATEGORY ==================== */}
      <section className="bg-[#EDE5D8] py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="section-label">Curated For You</p>
            <h2 className="section-title">
              Shop by <span className="section-title-italic">Category</span>
            </h2>
            <div className="section-divider"></div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  navigate(`/products?category=${cat.toLowerCase()}`);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Category Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Large Cards */}
            {[
              { img: "/images/home1.jpg", title: "Sunglasses", items: "124 Styles", link: "/products?category=sunglasses" },
              { img: "/images/home3.jpg", title: "Eyeglasses", items: "89 Styles", link: "/products?category=eyeglasses" },
            ].map((item, idx) => (
              <div
                key={idx}
                onClick={() => navigate(item.link)}
                className="relative group cursor-pointer overflow-hidden h-[420px] hover-card"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#C9974A] to-[#6B4F3A] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover hover-scale" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1612]/90 via-transparent to-transparent rounded-2xl"></div>
                <div className="absolute bottom-7 left-7">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9974A] mb-1">Shop</p>
                  <h3 className="font-['Cormorant_Garamond',serif] text-3xl italic text-[#F7F2EC]">{item.title}</h3>
                  <p className="text-[11px] text-white/45 mt-1">{item.items}</p>
                </div>
                <div className="absolute top-5 right-5 bg-[#C9974A]/90 p-2 text-[#1C1612] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={16} />
                </div>
              </div>
            ))}

            {/* Small Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              {catSmall.map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white border border-[#6B4F3A]/10 overflow-hidden cursor-pointer transition-all hover:border-[#C9974A]/40 hover:shadow-xl hover:-translate-y-2"
                  onClick={() => navigate(item.link)}
                >
                  <div className="h-32 overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-4 border-t border-[#6B4F3A]/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#C9974A]">{item.icon}</span>
                      <h4 className="font-['Cormorant_Garamond',serif] text-base text-[#1C1612]">{item.title}</h4>
                    </div>
                    <p className="text-[10px] tracking-wider uppercase text-[#C9974A]">Shop Now →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SHOP BY BRANDS ==================== */}
      <section className="bg-[#1C1612] py-24 overflow-hidden relative">
        {/* Background Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-['Cormorant_Garamond',serif] text-[200px] font-semibold text-white/5 whitespace-nowrap tracking-[0.2em] pointer-events-none select-none">
          BRANDS
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9974A] font-medium mb-2">Trusted Partners</p>
              <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light text-[#F7F2EC]">
                Shop by <span className="italic text-[#C9974A]">Brands</span>
              </h2>
              <div className="w-12 h-px bg-[#C9974A] mt-3"></div>
            </div>
            
            {/* Slider Arrows */}
            <div className="flex gap-2">
              <button className="arrow-btn" onClick={() => scrollBrands('left')}>‹</button>
              <button className="arrow-btn" onClick={() => scrollBrands('right')}>›</button>
            </div>
          </div>

          {/* Brands Slider */}
          <div 
            ref={sliderRef}
            id="brands-slider"
            className="flex gap-6 overflow-x-auto px-2 pb-4"
          >
            {brandData.map((brand, idx) => (
              <div
                key={idx}
                className="brand-card"
                onClick={() => navigate(`/products?brand=${brand.name.toLowerCase()}`)}
              >
                <div className="brand-glow"></div>
                <div className="relative z-10 rounded-t-[144px] rounded-b-lg overflow-hidden h-[400px] border border-[#C9974A]/10 shadow-2xl">
                  <img src={brand.img} alt={brand.name} className="brand-image w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1612]/98 via-[#1C1612]/30 to-transparent"></div>
                  
                  {/* Index Number */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 font-['Cormorant_Garamond',serif] text-xs italic text-[#C9974A]/50 tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </div>

                  {/* Products Count */}
                  <div className="absolute top-5 right-5 bg-[#C9974A] text-[#1C1612] text-[10px] px-3 py-1 rounded-full font-semibold">
                    {brand.products} Products
                  </div>

                  {/* Rating Stars */}
                  <div className="absolute bottom-24 left-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className={i < brand.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'} />
                    ))}
                  </div>

                  <div className="absolute bottom-6 left-5 right-5">
                    <div className="brand-line mb-3"></div>
                    <h3 className="font-['Cormorant_Garamond',serif] text-2xl italic text-[#F7F2EC] mb-1">{brand.name}</h3>
                    <p className="text-[10px] tracking-widest uppercase text-white/40 mb-4">{brand.desc}</p>
                    <div className="brand-cta flex items-center gap-2">
                      <span className="text-[10px] tracking-wider uppercase text-[#C9974A] font-semibold">Shop Now</span>
                      <div className="flex-1 h-px bg-[#C9974A]/40"></div>
                      <span className="text-[#C9974A]">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Progress */}
          <div className="mt-6">
            <div className="h-px bg-[#C9974A]/10">
              <div className="w-1/3 h-px bg-[#C9974A]"></div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-[10px] tracking-wider uppercase text-[#C9974A]/40">Drag to explore</p>
              <p className="text-[10px] text-[#C9974A]/40">{brandData.length} Brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== VIDEO SECTION ==================== */}
      <section 
        className="relative h-[600px] overflow-hidden cursor-pointer group"
        onClick={() => navigate("/products")}
      >
        <video autoPlay loop muted playsInline className="w-full h-260 object-cover">
          <source src="/images/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1612]/90 to-[#1C1612]/50 flex items-center group-hover:from-[#1C1612]/95 transition-all duration-500">
          <div className="container mx-auto px-4">
            <div className="max-w-lg transform group-hover:translate-x-2 transition-transform duration-500">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 border border-[#C9974A]/30 mb-6">
                <span className="w-2 h-2 bg-[#C9974A] rounded-full animate-pulse"></span>
                <span className="text-xs tracking-[0.2em] text-[#C9974A] font-semibold uppercase">The EYRA Experience</span>
              </div>
              
              <h2 className="font-['Cormorant_Garamond',serif] text-5xl md:text-6xl text-[#F7F2EC] mb-6 italic">
                Where Vision Meets Style
              </h2>
              <div className="w-12 h-px bg-[#C9974A] mb-6"></div>
              <p className="text-[15px] text-white/60 font-light leading-relaxed mb-8">
                Discover the perfect blend of craftsmanship, design, and innovation in every frame.
              </p>
              <button className="bg-[#C9974A] text-[#1C1612] px-8 py-3 text-[11px] tracking-wider uppercase font-semibold inline-flex items-center gap-2 hover:bg-white transition-all group/btn">
                Shop Now <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="bg-[#EDE5D8] py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Image */}
            <div 
              className="relative group cursor-pointer"
              onClick={() => navigate("/about")}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9974A] to-[#6B4F3A] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9974A]/20 to-transparent rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img src="/images/home5.jpg" alt="About EYRA" className="relative rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" />
              <div className="absolute -bottom-6 -right-6 bg-[#1C1612] p-6 rounded-2xl group-hover:scale-110 transition-transform">
                <Shield className="text-[#C9974A] mb-2" size={32} />
                <p className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#F7F2EC]">10+ Years</p>
                <p className="text-[10px] tracking-wider uppercase text-white/40">of Excellence</p>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <p className="section-label">Our Story</p>
              <h2 className="section-title mb-2">
                About <span className="section-title-italic">EYRA</span>
              </h2>
              <div className="w-12 h-px bg-[#C9974A] mb-6"></div>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-4">
                Founded in 2020, EYRA has redefined premium eyewear by combining timeless elegance with modern innovation. Every piece in our collection is meticulously crafted to enhance your vision and elevate your style.
              </p>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-8">
                From lightweight titanium frames to advanced UV-protected lenses, we ensure that every detail meets our uncompromising standards of quality and comfort.
              </p>
              <button 
                onClick={() => navigate("/about")}
                className="group bg-[#1C1612] text-[#F7F2EC] px-8 py-3 text-[11px] tracking-wider uppercase font-medium inline-flex items-center gap-2 hover:bg-[#C9974A] transition-all duration-300"
              >
                Discover More <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES - FIXED ==================== */}
      <section className="bg-[#1C1612] py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(201,151,74,0.05)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9974A] font-medium mb-2">Why Choose Us</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light text-white mb-2">
              Crafted to <span className="italic text-[#C9974A]">Perfection</span>
            </h2>
            <div className="w-12 h-px bg-[#C9974A] mx-auto mt-3"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/10 border border-[#C9974A]/20 p-8 rounded-lg transition-all duration-300 cursor-pointer hover:border-[#C9974A] hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => navigate("/about")}
              >
                <div className="w-14 h-14 rounded-full bg-[#C9974A]/20 border border-[#C9974A]/40 flex items-center justify-center text-[#C9974A] mb-5 transition-all duration-300 group-hover:bg-[#C9974A] group-hover:text-[#1C1612] group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="font-['Cormorant_Garamond',serif] text-xl text-white font-medium mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80 font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="bg-[#2E1F14] py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(201,151,74,0.06)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9974A] font-medium mb-2">Testimonials</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light text-[#F7F2EC]">
              What Our <span className="italic text-[#C9974A]">Customers Say</span>
            </h2>
            <div className="w-12 h-px bg-[#C9974A] mx-auto mt-3"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((test, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={13} className="text-[#C9974A] fill-current" />
                  ))}
                </div>
                <p className="font-['Cormorant_Garamond',serif] text-lg italic text-[#F7F2EC]/75 leading-relaxed mb-6">
                  "{test.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9974A]/15 border border-[#C9974A]/30 flex items-center justify-center">
                      <span className="font-['Cormorant_Garamond',serif] text-base text-[#C9974A] font-semibold">{test.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-[13px] text-[#F7F2EC] font-medium">{test.name}</p>
                      <p className="text-[10px] text-white/30">{test.date}</p>
                    </div>
                  </div>
                  <span className="text-[9px] tracking-wider text-[#C9974A] uppercase">Verified ✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEWSLETTER ==================== */}
      <section className="bg-gradient-to-r from-[#C9974A] to-[#B38B5A] py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 border border-white/30 mb-6">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            <span className="text-xs tracking-[0.2em] text-white font-semibold uppercase">Exclusive Offers</span>
          </div>
          
          <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl text-white mb-4 italic">
            Join the EYRA Circle
          </h2>
          <div className="w-12 h-px bg-white/30 mx-auto mb-6"></div>
          <p className="text-white/90 text-[15px] font-light leading-relaxed mb-9 max-w-xl mx-auto">
            Subscribe for early access to new arrivals, exclusive member offers, and curated eyewear trends delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-6 py-3 bg-white/90 backdrop-blur-sm text-[#1C1612] placeholder-[#6B4F3A]/50 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button 
              type="submit"
              className="bg-[#1C1612] text-white px-8 py-3 text-[11px] tracking-wider uppercase font-medium hover:bg-[#2E1F14] transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="bg-[#1C1612] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9974A] to-transparent"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <h2 
                className="font-['Cormorant_Garamond',serif] text-2xl font-semibold tracking-[0.2em] mb-4 cursor-pointer hover:text-[#C9974A] transition-colors"
                onClick={() => navigate("/")}
              >
                EY<span className="text-[#C9974A]">R</span>A
              </h2>
              <p className="text-[13px] text-white/30 font-light leading-relaxed mb-6 max-w-[240px]">
                Discover the finest eyewear for Men, Women & Kids. Vision meets style.
              </p>
              <div className="flex gap-3">
                {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 border border-[#C9974A]/20 rounded-full flex items-center justify-center text-white/40 cursor-pointer transition-all hover:text-[#C9974A] hover:border-[#C9974A] hover:-translate-y-1"
                    onClick={() => window.open(["https://facebook.com", "https://instagram.com", "https://twitter.com"][i], "_blank")}
                  >
                    <Icon size={13} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium mb-4">Navigation</p>
              {[
                ["Home", "/"],
                ["Products", "/products"],
                ["About", "/about"],
              ].map(([label, path]) => (
                <button key={label} className="footer-link" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>

            {/* Support */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium mb-4">Support</p>
              {[
                ["Shipping Policy", "/shipping"],
                ["Returns", "/returns"],
                ["FAQ", "/faq"],
              ].map(([label, path]) => (
                <button key={label} className="footer-link" onClick={() => navigate(path)}>{label}</button>
              ))}
            </div>

            {/* Contact */}
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium mb-4">Get in Touch</p>
              <button className="footer-link" onClick={() => window.location.href = "mailto:eyra@gmail.com"}>eyra@gmail.com</button>
              <button className="footer-link" onClick={() => window.location.href = "tel:+919087654321"}>+91 9087654321</button>
              <p className="text-[12px] text-white/20 font-light leading-relaxed mt-4">
                Mon – Sat<br />10:00 AM – 7:00 PM IST
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#C9974A]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/20 tracking-wider">
              © {new Date().getFullYear()} EYRA. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(item => (
                <button
                  key={item}
                  className="text-[10px] text-white/20 tracking-wide hover:text-[#C9974A] transition-colors"
                  onClick={() => navigate(`/${item.toLowerCase().replace(/ /g, "-")}`)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}