// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { User, Heart, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
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
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-serif font-bold tracking-widest text-gray-800 hover:text-indigo-600 transition"
          >
            EYRA
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-5 relative">

            {/* Wishlist & Cart only visible when logged in */}
            {user && (
              <>
                <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600 transition">
                  <Heart size={22} />
                </Link>

                <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition">
                  <ShoppingCart size={22} />
                </Link>
              </>
            )}

            {/* User Icon Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="text-gray-700 hover:text-indigo-600 transition focus:outline-none"
              >
                <User size={24} />
              </button>

              {open && (
                <div className="absolute right-0 mt-3 w-44 bg-white border rounded-lg shadow-lg py-2">

                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-indigo-50 transition"
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-indigo-50 transition"
                      >
                        Logout
                      </button>
                    </>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
