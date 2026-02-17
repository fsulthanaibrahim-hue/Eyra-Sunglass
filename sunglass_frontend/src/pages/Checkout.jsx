import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("You must be logged in to checkout");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // Call your backend checkout API
      const res = await API.post('checkout/',{ products: cartProducts },);
      toast.success("Order placed successfully!");
      navigate("/orders"); // redirect to order summary page
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto py-24 px-4">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-600 mb-6">
          Review your items and confirm your order.
        </p>

        {/* For simplicity, you can list cart items here later */}
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <p>Cart items will appear here.</p>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
