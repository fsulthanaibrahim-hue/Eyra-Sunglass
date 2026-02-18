// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Heart, ShoppingCart, LogOut, UserCircle } from "lucide-react";

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Jost:wght@300;400;500;600&display=swap');

  .eyra-nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    background: rgba(28, 22, 18, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(201, 151, 74, 0.15);
    transition: background 0.3s ease, box-shadow 0.3s ease;
  }

  .eyra-nav.scrolled {
    background: rgba(28, 22, 18, 1);
    box-shadow: 0 4px 32px rgba(0,0,0,0.35);
  }

  .eyra-nav-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 32px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Logo */
  .eyra-logo {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.8rem;
    font-weight: 600;
    letter-spacing: 8px;
    color: #F7F2EC;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;
  }
  .eyra-logo span { color: #C9974A; }
  .eyra-logo:hover { color: #C9974A; }

  /* Right icons */
  .eyra-nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  .eyra-icon-btn {
    width: 38px; height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(247, 242, 236, 0.65);
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 2px;
    transition: color 0.3s ease, background 0.3s ease;
    text-decoration: none;
    position: relative;
  }
  .eyra-icon-btn:hover {
    color: #C9974A;
    background: rgba(201, 151, 74, 0.08);
  }

  /* Gold divider between icons */
  .eyra-icon-divider {
    width: 1px;
    height: 18px;
    background: rgba(201, 151, 74, 0.2);
    margin: 0 4px;
  }

  /* Dropdown */
  .eyra-dropdown-wrap {
    position: relative;
  }

  .eyra-dropdown {
    position: absolute;
    top: calc(100% + 16px);
    right: 0;
    width: 200px;
    background: #1C1612;
    border: 1px solid rgba(201, 151, 74, 0.2);
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    padding: 8px 0;
    animation: dropIn 0.2s ease;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Dropdown top gold accent line */
  .eyra-dropdown::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #C9974A, transparent);
  }

  .eyra-dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px 20px;
    font-family: 'Jost', sans-serif;
    font-size: 12px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 400;
    color: rgba(247, 242, 236, 0.65);
    text-decoration: none;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: color 0.2s, background 0.2s, padding-left 0.2s;
  }
  .eyra-dropdown-item:hover {
    color: #C9974A;
    background: rgba(201, 151, 74, 0.06);
    padding-left: 26px;
  }
  .eyra-dropdown-item svg {
    opacity: 0.5;
    flex-shrink: 0;
    transition: opacity 0.2s;
  }
  .eyra-dropdown-item:hover svg { opacity: 1; }

  .eyra-dropdown-divider {
    height: 1px;
    background: rgba(201, 151, 74, 0.1);
    margin: 6px 0;
  }

  .eyra-dropdown-user-label {
    padding: 12px 20px 8px;
    font-family: 'Jost', sans-serif;
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #C9974A;
    font-weight: 500;
  }

  /* Cart badge */
  .eyra-badge {
    position: absolute;
    top: 4px; right: 4px;
    width: 16px; height: 16px;
    background: #C9974A;
    color: #1C1612;
    font-size: 9px;
    font-weight: 700;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Jost', sans-serif;
  }

  @media (max-width: 768px) {
    .eyra-nav-inner { padding: 0 20px; }
  }
`;

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <style>{navStyles}</style>

      <nav className={`eyra-nav${scrolled ? " scrolled" : ""}`}>
        <div className="eyra-nav-inner">

          {/* ── Logo ── */}
          <Link to="/" className="eyra-logo">
            EY<span>R</span>A
          </Link>

          {/* ── Right Icons ── */}
          <div className="eyra-nav-right">

            {user && (
              <>
                <Link to="/wishlist" className="eyra-icon-btn" title="Wishlist">
                  <Heart size={18} />
                </Link>

                <Link to="/cart" className="eyra-icon-btn" title="Cart" style={{ position: "relative" }}>
                  <ShoppingCart size={18} />
                  {/* Uncomment and wire up cart count: */}
                  {/* <span className="eyra-badge">2</span> */}
                </Link>

                <div className="eyra-icon-divider" />
              </>
            )}

            {/* ── User Dropdown ── */}
            <div ref={dropdownRef} className="eyra-dropdown-wrap">
              <button
                onClick={() => setOpen(!open)}
                className="eyra-icon-btn"
                title="Account"
                style={{ color: open ? "#C9974A" : undefined }}
              >
                <User size={18} />
              </button>

              {open && (
                <div className="eyra-dropdown">
                  {!user ? (
                    <>
                      <p className="eyra-dropdown-user-label">Account</p>
                      <div className="eyra-dropdown-divider" />
                      <Link
                        to="/login"
                        className="eyra-icon-btn eyra-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <User size={14} />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="eyra-icon-btn eyra-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <UserCircle size={14} />
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <p className="eyra-dropdown-user-label">My Account</p>
                      <div className="eyra-dropdown-divider" />
                      <Link
                        to="/profile"
                        className="eyra-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <UserCircle size={14} />
                        Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="eyra-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <ShoppingCart size={14} />
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="eyra-dropdown-item"
                        onClick={() => setOpen(false)}
                      >
                        <Heart size={14} />
                        Wishlist
                      </Link>
                      <div className="eyra-dropdown-divider" />
                      <button
                        onClick={() => { logout(); setOpen(false); }}
                        className="eyra-dropdown-item"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}