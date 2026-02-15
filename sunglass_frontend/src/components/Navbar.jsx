// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useContext(AuthContext); // assume AuthContext provides user info

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-serif font-bold tracking-wide text-gray-800">
              EYRA
            </Link>
          </div>

          {/* Right icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Wishlist */}
                <Link to="/wishlist" className="text-gray-800 hover:text-gray-600 transition">
                  ❤️
                </Link>
                {/* Cart */}
                <Link to="/cart" className="text-gray-800 hover:text-gray-600 transition">
                  🛒
                </Link>
              </>
            ) : (
              <Link to="/login" className="text-gray-800 hover:text-gray-600 transition">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
