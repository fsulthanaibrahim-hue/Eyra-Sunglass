// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/products', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await API.post("/users/login/", { username, password });
      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;
      if (!accessToken || !refreshToken) {
        toast.error("Login failed: No token returned");
        return;
      }
      localStorage.setItem("refresh", refreshToken);
      const userData = {
        username,
        id: res.data.user?.id || null,
        email: res.data.user?.email || null,
        first_name: res.data.user?.first_name || '',
        last_name: res.data.user?.last_name || '',
      };
      login(userData, accessToken);
      toast.success("Logged in successfully!");
    } catch (err) {
      let errorMessage = "Invalid username or password";
      if (err.response?.data?.detail) errorMessage = err.response.data.detail;
      else if (err.response?.data?.message) errorMessage = err.response.data.message;
      else if (err.response?.data?.non_field_errors) errorMessage = err.response.data.non_field_errors[0];
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (user) return null;

  return (
    <div className="min-h-screen bg-[#F7F2EC]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-24 pb-16 min-h-screen">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9974A] mb-2 font-medium">
              Welcome Back
            </p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl font-semibold text-[#1C1612]"
            >
              Sign In
            </h1>
            <div className="flex items-center gap-3 mt-4 justify-center">
              <div className="h-px w-12 bg-[#C9974A]/30" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9974A]/50" />
              <div className="h-px w-12 bg-[#C9974A]/30" />
            </div>
          </div>

          {/* Card */}
          <div className="bg-white border border-[#6B4F3A]/10 rounded-xl p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Username */}
              <div>
                <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6B4F3A] mb-2">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  autoComplete="username"
                  required
                  className="w-full px-4 py-3 bg-[#F7F2EC] border border-[#6B4F3A]/15 rounded-lg text-sm text-[#1C1612] placeholder-[#9A8070]/60 focus:outline-none focus:border-[#C9974A]/50 focus:ring-2 focus:ring-[#C9974A]/10 transition-all disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6B4F3A] mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 pr-11 bg-[#F7F2EC] border border-[#6B4F3A]/15 rounded-lg text-sm text-[#1C1612] placeholder-[#9A8070]/60 focus:outline-none focus:border-[#C9974A]/50 focus:ring-2 focus:ring-[#C9974A]/10 transition-all disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8070] hover:text-[#C9974A] transition-colors disabled:opacity-40"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-[11px] text-[#9A8070] hover:text-[#C9974A] transition-colors tracking-wide"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-[#1C1612] text-[#F7F2EC] hover:bg-[#C9974A] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-[#F7F2EC]/40 border-t-[#F7F2EC] rounded-full animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>

          {/* Register Link */}
          <p className="text-center text-xs text-[#9A8070] mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#C9974A] font-semibold hover:underline underline-offset-2 transition-colors"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}