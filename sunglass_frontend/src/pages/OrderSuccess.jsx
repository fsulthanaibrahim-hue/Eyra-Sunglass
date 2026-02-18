import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get('orderId');
  const total = queryParams.get('total');

  console.log('📍 OrderSuccess page loaded');
  console.log('📍 Order ID from URL:', orderId);
  console.log('📍 Total from URL:', total);

  useEffect(() => {
    if (!orderId) {
      const timer = setTimeout(() => navigate('/'), 3000);
      return () => clearTimeout(timer);
    }
  }, [orderId, navigate]);

  useEffect(() => {
    if (!orderId) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); navigate('/profile'); return 0; }
        return prev - 1;
      });
    }, 1000);

    const redirectTimer = setTimeout(() => navigate('/profile'), 5000);
    return () => { clearInterval(timer); clearTimeout(redirectTimer); };
  }, [orderId, navigate]);

  // ── No order data ──
  if (!orderId) {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F2EC" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');`}</style>
        <Navbar />
        <div style={{ maxWidth: "560px", margin: "0 auto", padding: "160px 24px 80px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontStyle: "italic", color: "#6B4F3A", marginBottom: "12px" }}>
            No Order Information
          </p>
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#9A8070", fontWeight: 300, letterSpacing: "1px" }}>
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  // ── Success Page ──
  return (
    <div style={{ minHeight: "100vh", background: "#F7F2EC", fontFamily: "'Jost',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

        @keyframes eyra-spin  { to { transform: rotate(360deg); } }
        @keyframes checkDraw  { from { stroke-dashoffset: 60; } to { stroke-dashoffset: 0; } }
        @keyframes ringPulse  {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .success-card {
          background: #fff;
          border: 1px solid rgba(107,79,58,0.12);
          padding: 56px 48px;
          text-align: center;
          animation: fadeUp 0.6s ease both;
        }

        /* Animated checkmark */
        .check-wrap {
          position: relative;
          width: 80px; height: 80px;
          margin: 0 auto 36px;
        }
        .check-ring-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(201,151,74,0.5);
          animation: ringPulse 1.4s ease-out infinite;
        }
        .check-circle {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(201,151,74,0.1);
          border: 2px solid rgba(201,151,74,0.4);
          display: flex; align-items: center; justify-content: center;
          position: relative; z-index: 1;
        }
        .check-icon {
          stroke-dasharray: 60;
          stroke-dashoffset: 60;
          animation: checkDraw 0.6s ease 0.3s forwards;
        }

        /* Order detail row */
        .order-detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(107,79,58,0.07);
        }
        .order-detail-row:last-child { border-bottom: none; }

        /* Countdown bar */
        .countdown-wrap {
          background: rgba(201,151,74,0.06);
          border: 1px solid rgba(201,151,74,0.2);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        /* Buttons */
        .btn-primary-success {
          display: block;
          width: 100%;
          background: #1C1612;
          color: #F7F2EC;
          text-align: center;
          padding: 15px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.3s, transform 0.2s;
          margin-bottom: 10px;
        }
        .btn-primary-success:hover { background: #6B4F3A; transform: translateY(-1px); }

        .btn-secondary-success {
          display: block;
          width: 100%;
          background: transparent;
          color: #1C1612;
          text-align: center;
          padding: 14px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid rgba(28,22,18,0.25);
          transition: border-color 0.3s, color 0.3s;
        }
        .btn-secondary-success:hover { border-color: #C9974A; color: #C9974A; }
      `}</style>

      <Navbar />

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "100px 24px 80px" }}>
        <div className="success-card">

          {/* ── Animated Check Icon ── */}
          <div className="check-wrap">
            <div className="check-ring-pulse" />
            <div className="check-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9974A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path className="check-icon" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* ── Title ── */}
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", color: "#C9974A", fontWeight: 500, marginBottom: "12px" }}>
            Confirmed
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 300, color: "#1C1612", fontStyle: "italic", marginBottom: "6px" }}>
            Order Placed Successfully!
          </h1>
          <div style={{ width: "40px", height: "1px", background: "#C9974A", margin: "16px auto 28px" }} />

          {/* ── Order Details Box ── */}
          <div style={{ background: "#F7F2EC", border: "1px solid rgba(107,79,58,0.1)", marginBottom: "28px" }}>
            <div className="order-detail-row">
              <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#9A8070", fontWeight: 500 }}>
                Order ID
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.1rem", fontWeight: 600, color: "#1C1612" }}>
                #{orderId}
              </span>
            </div>
            <div className="order-detail-row">
              <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#9A8070", fontWeight: 500 }}>
                Total Paid
              </span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.4rem", fontWeight: 600, color: "#C9974A" }}>
                ₹{total}
              </span>
            </div>
            <div className="order-detail-row">
              <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "#9A8070", fontWeight: 500 }}>
                Payment
              </span>
              <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A", fontWeight: 500 }}>
                Cash on Delivery
              </span>
            </div>
          </div>

          {/* ── Thank you note ── */}
          <p style={{ fontFamily: "'Jost',sans-serif", fontSize: "13px", color: "#9A8070", fontWeight: 300, lineHeight: 1.8, marginBottom: "28px", letterSpacing: "0.5px" }}>
            Thank you for your purchase! We'll send you an email with order details shortly.
          </p>

          {/* ── Countdown ── */}
          <div className="countdown-wrap">
            <div style={{ width: "28px", height: "28px", border: "2px solid rgba(201,151,74,0.2)", borderTopColor: "#C9974A", borderRadius: "50%", animation: "eyra-spin 1s linear infinite", flexShrink: 0 }} />
            <p style={{ fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#6B4F3A", fontWeight: 400 }}>
              Redirecting in <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.2rem", fontStyle: "italic", color: "#C9974A", fontWeight: 600 }}>{countdown}</span> seconds
            </p>
          </div>

          {/* ── Buttons ── */}
          <Link to="/profile" className="btn-primary-success">
            View My Orders
          </Link>
          <Link to="/products" className="btn-secondary-success">
            Continue Shopping
          </Link>

        </div>
      </div>
    </div>
  );
}