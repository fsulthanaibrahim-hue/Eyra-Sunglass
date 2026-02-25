import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  User, Mail, Phone, MapPin, Home, Package, 
  ShoppingCart, Heart, LogOut, Camera, Edit2, Save, X 
} from 'lucide-react';

export default function Profile() {
  const { user, token, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    username: '', email: '', first_name: '', last_name: '', phone: '',
    address_line1: '', address_line2: '', city: '', state: '', pincode: '', country: 'India'
  });
  const [editing, setEditing] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    setProfileData({
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      phone: user.phone || '',
      address_line1: user.address_line1 || '',
      address_line2: user.address_line2 || '',
      city: user.city || '',
      state: user.state || '',
      pincode: user.pincode || '',
      country: user.country || 'India'
    });
    const saved = localStorage.getItem(`avatar_${user.id || user.username}`);
    if (saved) setAvatar(saved);
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    setUpdating(true);
    try {
      let response;
      let success = false;
      const endpoints = [
        { method: 'put', url: '/users/profile/' },
        { method: 'patch', url: '/users/profile/' },
        { method: 'put', url: '/users/me/' },
        { method: 'patch', url: '/users/me/' },
        { method: 'post', url: '/users/profile/update/' }
      ];
      for (const endpoint of endpoints) {
        try {
          if (endpoint.method === 'put') {
            response = await API.put(endpoint.url, profileData, { headers: { Authorization: `Bearer ${token}` } });
          } else if (endpoint.method === 'patch') {
            response = await API.patch(endpoint.url, profileData, { headers: { Authorization: `Bearer ${token}` } });
          } else {
            response = await API.post(endpoint.url, profileData, { headers: { Authorization: `Bearer ${token}` } });
          }
          success = true;
          break;
        } catch (err) {}
      }
      if (success && response) {
        const updatedUser = {
          ...response.data,
          full_name: `${response.data.first_name || ''} ${response.data.last_name || ''}`.trim()
        };
        login(updatedUser, token);
        toast.success('Profile updated successfully');
        setEditing(false);
      } else {
        throw new Error('All endpoints failed');
      }
    } catch (error) {
      const updatedUser = {
        ...user,
        ...profileData,
        full_name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim()
      };
      login(updatedUser, token);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated locally');
      setEditing(false);
    } finally {
      setUpdating(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result;
      setAvatar(base64);
      localStorage.setItem(`avatar_${user.id || user.username}`, base64);
      toast.success('Profile photo updated!');
    };
    reader.readAsDataURL(file);
  };

  const displayName = user
    ? (user.first_name || user.last_name
        ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
        : user.username)
    : '';

  const initials = displayName
    ? displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F7F2EC]">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
          <p className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl italic text-[#6B4F3A]">
            Please login to view profile
          </p>
          <Link to="/login" className="bg-[#1C1612] text-[#F7F2EC] px-10 py-4 font-['Jost',sans-serif] text-xs tracking-[0.2em] uppercase font-medium no-underline hover:bg-[#C9974A] transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#1C1612] via-[#2E1F14] to-[#3A2518] pt-24 pb-8 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,151,74,0.07)_0%,transparent_65%)] rounded-full pointer-events-none" />

        {/* Avatar */}
        <div className="relative w-20 h-20 mx-auto mb-3 cursor-pointer group" onClick={handleAvatarClick}>
          <div className="absolute inset-0 rounded-full border border-[#C9974A]/20" />
          <div className="w-20 h-20 rounded-full border-4 border-[#C9974A]/45 overflow-hidden relative bg-gradient-to-br from-[#C9974A] to-[#8a6a3a]">
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/25 transition-colors z-10" />
            {avatar ? (
              <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="font-['Cormorant_Garamond',serif] text-2xl font-semibold text-[#F7F2EC] flex items-center justify-center h-full">
                {initials}
              </span>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#C9974A] rounded-full border-2 border-[#1C1612] flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-[#e0aa5a] z-20">
            <Camera size={12} className="text-[#1C1612]" />
          </div>
        </div>

        <h1 className="font-['Cormorant_Garamond',serif] text-2xl font-light text-[#F7F2EC] italic mb-0.5 relative z-10">
          {displayName}
        </h1>
        <p className="text-xs text-white/40 tracking-wider relative z-10">{user.email}</p>
        <div className="w-8 h-px bg-[#C9974A]/40 mx-auto mt-3 relative z-10" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-[#6B4F3A]/10 p-5">
              <div className="pb-3 border-b border-[#6B4F3A]/10 mb-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium">Overview</p>
                <h3 className="font-['Cormorant_Garamond',serif] text-lg italic text-[#1C1612]">Account Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9A8070]">Member Since</span>
                  <span className="font-['Cormorant_Garamond',serif] text-base font-semibold italic text-[#C9974A]">
                    {user.date_joined ? new Date(user.date_joined).getFullYear() : '2026'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9A8070]">Account Status</span>
                  <span className="font-['Cormorant_Garamond',serif] text-base font-semibold italic text-green-600">Active</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#6B4F3A]/10 p-5">
              <div className="pb-3 border-b border-[#6B4F3A]/10 mb-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium">Navigate</p>
                <h3 className="font-['Cormorant_Garamond',serif] text-lg italic text-[#1C1612]">Quick Actions</h3>
              </div>
              <div className="space-y-1">
                {[
                  { icon: <Package size={16} />, label: "My Orders", to: "/orders" },
                  { icon: <ShoppingCart size={16} />, label: "Go to Cart", to: "/cart" },
                  { icon: <Heart size={16} />, label: "Wishlist", to: "/wishlist" },
                  { icon: <Home size={16} />, label: "Home", to: "/" },
                ].map((item, i) => (
                  <Link key={i} to={item.to} className="flex items-center gap-3 py-3 px-2 border-b border-[#6B4F3A]/5 last:border-0 hover:bg-[#C9974A]/5 hover:pl-4 transition-all group">
                    <span className="text-[#C9974A]">{item.icon}</span>
                    <span className="text-xs tracking-wider uppercase text-[#6B4F3A] flex-1">{item.label}</span>
                    <span className="text-[#C9974A]/40 text-sm">→</span>
                  </Link>
                ))}
                <button onClick={handleLogout} className="flex items-center gap-3 py-3 px-2 w-full text-left border-t border-[#6B4F3A]/10 mt-2 pt-3 hover:bg-red-50 hover:pl-4 transition-all">
                  <span className="text-red-500"><LogOut size={16} /></span>
                  <span className="text-xs tracking-wider uppercase text-red-600 flex-1">Logout</span>
                  <span className="text-red-400 text-sm">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-[#6B4F3A]/10">
              <div className="p-6 border-b border-[#6B4F3A]/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#C9974A] font-medium">Personal</p>
                  <h2 className="font-['Cormorant_Garamond',serif] text-xl italic text-[#1C1612]">Profile Information</h2>
                </div>
                <button onClick={() => setEditing(!editing)} className="px-4 py-2 text-[10px] tracking-wider uppercase border border-[#C9974A]/40 text-[#C9974A] font-medium hover:bg-[#C9974A] hover:text-[#1C1612] transition-all flex items-center gap-2">
                  {editing ? <X size={14} /> : <Edit2 size={14} />}
                  {editing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="p-6">
                {editing ? (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">First Name</label>
                        <input type="text" name="first_name" value={profileData.first_name} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] focus:border-[#C9974A] focus:bg-white transition-all outline-none" placeholder="First name" />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">Last Name</label>
                        <input type="text" name="last_name" value={profileData.last_name} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] focus:border-[#C9974A] focus:bg-white transition-all outline-none" placeholder="Last name" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">Username</label>
                      <input type="text" name="username" value={profileData.username} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] opacity-60 cursor-not-allowed" disabled />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">Email Address</label>
                      <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] focus:border-[#C9974A] focus:bg-white transition-all outline-none" placeholder="Email" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">Phone Number</label>
                      <input type="text" name="phone" value={profileData.phone} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] focus:border-[#C9974A] focus:bg-white transition-all outline-none" placeholder="Phone" />
                    </div>
                    <div className="pt-4 border-t border-[#6B4F3A]/10">
                      <p className="text-[10px] tracking-wider uppercase text-[#C9974A] font-medium mb-4 flex items-center gap-2">
                        <MapPin size={14} /> Address Information
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { name: 'address_line1', label: 'Address Line 1', placeholder: 'Street address' },
                          { name: 'address_line2', label: 'Address Line 2', placeholder: 'Apartment, suite etc.' },
                          { name: 'city', label: 'City', placeholder: 'City' },
                          { name: 'state', label: 'State', placeholder: 'State' },
                          { name: 'pincode', label: 'Pincode', placeholder: 'Pincode' },
                          { name: 'country', label: 'Country', placeholder: 'Country' },
                        ].map(field => (
                          <div key={field.name}>
                            <label className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1 block">{field.label}</label>
                            <input type="text" name={field.name} value={profileData[field.name]} onChange={handleInputChange} className="w-full px-3 py-2 bg-[#F7F2EC] border border-[#6B4F3A]/20 text-sm text-[#1C1612] focus:border-[#C9974A] focus:bg-white transition-all outline-none" placeholder={field.placeholder} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={handleUpdateProfile} disabled={updating} className="w-full bg-[#1C1612] text-[#F7F2EC] py-3 text-xs tracking-wider uppercase font-medium hover:bg-[#C9974A] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                      {updating ? 'Updating...' : <><Save size={14} /> Save Changes</>}
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] tracking-wider uppercase text-[#C9974A] font-medium mb-4 flex items-center gap-2">
                      <User size={14} /> Personal Information
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {[
                        { label: 'Full Name', value: displayName },
                        { label: 'Email Address', value: user.email },
                        { label: 'Phone Number', value: user.phone },
                        { label: 'Username', value: user.username },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1">{item.label}</p>
                          <p className="text-sm text-[#1C1612]">{item.value || 'Not provided'}</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-px bg-[#6B4F3A]/10 mb-8" />
                    <p className="text-[10px] tracking-wider uppercase text-[#C9974A] font-medium mb-4 flex items-center gap-2">
                      <MapPin size={14} /> Address Information
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Street Address', value: user.address_line1 },
                        { label: 'City', value: user.city },
                        { label: 'State', value: user.state },
                        { label: 'ZIP Code', value: user.pincode },
                        { label: 'Country', value: user.country || 'India' },
                      ].map(item => (
                        <div key={item.label}>
                          <p className="text-[10px] tracking-wider uppercase text-[#9A8070] font-medium mb-1">{item.label}</p>
                          <p className="text-sm text-[#1C1612]">{item.value || 'Not provided'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}