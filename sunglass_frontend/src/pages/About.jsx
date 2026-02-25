import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  Award, Heart, Eye, Shield, Star, ArrowRight, 
  Mail, Phone, MapPin, Clock, Users, Sparkles 
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.8s ease forwards; }

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

        /* Card hover effects */
        .hover-card {
          transition: all 0.4s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }

        /* Footer link style (copied from Home) */
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
      `}</style>

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[70vh] min-h-[500px] bg-[#1C1612] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,151,74,0.1)_0%,transparent_70%)]"></div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#C9974A]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#C9974A]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-2.5 border border-[#C9974A]/30 mb-8">
            <span className="w-2 h-2 bg-[#C9974A] rounded-full animate-pulse"></span>
            <span className="text-xs tracking-[0.2em] text-[#C9974A] font-semibold uppercase">Our Story</span>
          </div>
          <h1 className="font-['Cormorant_Garamond',serif] text-5xl md:text-7xl font-light text-[#F7F2EC] mb-6">
            About <span className="italic text-[#C9974A]">EYRA</span>
          </h1>
          <div className="w-20 h-px bg-[#C9974A] mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-[#F7F2EC]/80 font-light max-w-2xl mx-auto">
            Crafting premium eyewear with timeless elegance and uncompromising quality since 2020.
          </p>
        </div>
      </section>

      {/* ==================== OUR STORY ==================== */}
      <section className="py-24 bg-[#EDE5D8]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group cursor-pointer" onClick={() => navigate("/about")}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9974A] to-[#6B4F3A] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9974A]/20 to-transparent rounded-3xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
              <img 
                src="/images/home5.jpg" 
                alt="EYRA Workshop" 
                className="relative rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full h-auto"
              />
            </div>

            <div>
              <p className="section-label">Our Journey</p>
              <h2 className="section-title mb-2">
                The <span className="section-title-italic">EYRA</span> Story
              </h2>
              <div className="w-12 h-px bg-[#C9974A] mb-6"></div>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-4">
                Founded in 2020, EYRA began with a simple vision: to create eyewear that blends classic sophistication with modern innovation. What started as a small atelier in Kerala has grown into a trusted brand for thousands across India.
              </p>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-4">
                Every pair of EYRA glasses is meticulously crafted using premium materials – from lightweight titanium to hand-polished acetate – and undergoes rigorous quality checks to ensure lasting comfort and clarity.
              </p>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-8">
                Today, we offer a wide range of sunglasses, eyeglasses, and specialty lenses, all designed to help you see the world in style.
              </p>
              <button 
                onClick={() => navigate("/products")}
                className="group bg-[#1C1612] text-[#F7F2EC] px-8 py-3 text-[11px] tracking-wider uppercase font-medium inline-flex items-center gap-2 hover:bg-[#C9974A] transition-all duration-300"
              >
                Explore Collection <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="py-20 bg-[#F7F2EC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              ["25+", "Premium Brands"],
              ["10K+", "Happy Customers"],
              ["500+", "Unique Styles"],
              ["100%", "Quality Guarantee"],
            ].map(([stat, label]) => (
              <div key={label} className="group cursor-pointer hover-card p-6" onClick={() => navigate("/products")}>
                <div className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-semibold italic text-[#C9974A] group-hover:scale-110 transition-transform">
                  {stat}
                </div>
                <div className="text-[10px] tracking-wider uppercase text-[#9A8070] mt-2">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CORE VALUES ==================== */}
      <section className="py-24 bg-[#1C1612] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(201,151,74,0.05)_0%,transparent_65%)] rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[#C9974A] font-medium mb-2">What We Believe</p>
            <h2 className="font-['Cormorant_Garamond',serif] text-4xl md:text-5xl font-light text-white mb-2">
              Our <span className="italic text-[#C9974A]">Core Values</span>
            </h2>
            <div className="w-12 h-px bg-[#C9974A] mx-auto mt-3"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: <Award size={26} />, title: "Quality First", desc: "Every frame is built to last using premium materials and rigorous testing." },
              { icon: <Heart size={26} />, title: "Customer Love", desc: "Your satisfaction drives us – we're here to ensure you love your eyewear." },
              { icon: <Eye size={26} />, title: "Optical Excellence", desc: "Crystal-clear vision with advanced UV protection and precision lenses." },
              { icon: <Sparkles size={26} />, title: "Timeless Design", desc: "Classic styles that never go out of fashion, updated for the modern wearer." },
              { icon: <Users size={26} />, title: "Community", desc: "Building a community of style-conscious individuals who value quality." },
              { icon: <Shield size={26} />, title: "Authenticity", desc: "100% genuine products with warranty and dedicated after-sales support." },
            ].map((value, idx) => (
              <div
                key={idx}
                className="group bg-white/10 border border-[#C9974A]/20 p-8 rounded-lg transition-all duration-300 cursor-pointer hover:border-[#C9974A] hover:bg-white/20 hover:-translate-y-2 hover:shadow-2xl"
                onClick={() => navigate("/about")}
              >
                <div className="w-14 h-14 rounded-full bg-[#C9974A]/20 border border-[#C9974A]/40 flex items-center justify-center text-[#C9974A] mb-5 transition-all duration-300 group-hover:bg-[#C9974A] group-hover:text-[#1C1612] group-hover:scale-110">
                  {value.icon}
                </div>
                <h3 className="font-['Cormorant_Garamond',serif] text-xl text-white font-medium mb-2">{value.title}</h3>
                <p className="text-sm text-white/80 font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY EYRA ==================== */}
      <section className="py-24 bg-[#EDE5D8]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Why Choose Us</p>
              <h2 className="section-title mb-2">
                Craftsmanship You Can <span className="section-title-italic">Trust</span>
              </h2>
              <div className="w-12 h-px bg-[#C9974A] mb-6"></div>
              <p className="text-[15px] text-[#6B4F3A] font-light leading-relaxed mb-6">
                At EYRA, we believe that your eyewear should be as unique as you are. That's why we offer:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Handcrafted frames using Italian acetate and Japanese titanium",
                  "Blue-light filtering and 100% UV protection lenses",
                  "Personalized fitting and virtual try‑on",
                  "2‑year warranty and 30‑day returns",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9974A] mt-2"></span>
                    <span className="text-[15px] text-[#6B4F3A] font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => navigate("/products")}
                className="group bg-[#1C1612] text-[#F7F2EC] px-8 py-3 text-[11px] tracking-wider uppercase font-medium inline-flex items-center gap-2 hover:bg-[#C9974A] transition-all duration-300"
              >
                Shop Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="relative group cursor-pointer" onClick={() => navigate("/products")}>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C9974A] to-[#6B4F3A] rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
              <img 
                src="/images/home3.jpg" 
                alt="Craftsmanship" 
                className="relative rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER (EXACT COPY FROM HOME) ==================== */}
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