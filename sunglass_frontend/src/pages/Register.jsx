import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("users/register/", { username, email, password });

      if (res.data.access) {
        login(res.data.access);
        toast.success("Account created successfully!");
        navigate("/");
      } else {
        toast.error("Registration failed: no token returned");
      }
    } catch (err) {
      const errors = err.response?.data;
      if (errors?.username) toast.error("Username: " + errors.username.join(" "));
      else if (errors?.email) toast.error("Email: " + errors.email.join(" "));
      else if (errors?.password) toast.error("Password: " + errors.password.join(" "));
      else toast.error("Registration failed: Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EC]" style={{ fontFamily: "'Jost', sans-serif" }}>
      <Navbar />

      <div className="flex items-center justify-center px-4 pt-24 pb-16 min-h-screen">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9974A] mb-2 font-medium">
              Join Us
            </p>
            <h1
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl font-semibold text-[#1C1612]"
            >
              Create Account
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

              <div>
                <label className="block text-[11px] font-medium tracking-widest uppercase text-[#6B4F3A] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-[#F7F2EC] border border-[#6B4F3A]/15 rounded-lg text-sm text-[#1C1612] placeholder-[#9A8070]/60 focus:outline-none focus:border-[#C9974A]/50 focus:ring-2 focus:ring-[#C9974A]/10 transition-all disabled:opacity-60"
                />
              </div>

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
                    autoComplete="new-password"
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

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-[#1C1612] text-[#F7F2EC] hover:bg-[#C9974A] active:scale-[0.98]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-3.5 h-3.5 border-2 border-[#F7F2EC]/40 border-t-[#F7F2EC] rounded-full animate-spin" />
                    Creating account...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-xs text-[#9A8070] mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#C9974A] font-semibold hover:underline underline-offset-2 transition-colors"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}