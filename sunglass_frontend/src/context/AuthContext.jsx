import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpiry, setSessionExpiry] = useState(null);

  const checkTokenExpiry = () => {
    const token = localStorage.getItem('access');
    if (!token) return false;

    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      
      const exp = payload.exp * 1000; 
      const now = Date.now();
      const timeLeft = exp - now;
      
      console.log(`⏰ Token expires in ${Math.round(timeLeft / 1000 / 60)} minutes`);
      
      setSessionExpiry(exp);
      
      return exp > now;
    } catch (e) {
      console.error('Error checking token expiry:', e);
      return false;
    }
  };

  useEffect(() => {
    const loadUser = () => {
      try {
        console.log('📦 Loading auth data from localStorage...');
        
        const storedToken = localStorage.getItem('access');
        const storedUser = localStorage.getItem('user');
        
        console.log('Stored token:', storedToken ? '✅' : '❌');
        console.log('Stored user:', storedUser ? '✅' : '❌');
        
        if (storedToken && storedUser) {
          if (!checkTokenExpiry()) {
            console.log('⚠️ Token expired on load');
            logout();
            return;
          }
          
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          console.log('✅ User loaded:', JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (!sessionExpiry) return;

    const timeUntilExpiry = sessionExpiry - Date.now();
    
    if (timeUntilExpiry <= 0) {
      logout();
      return;
    }

    const logoutTimer = setTimeout(() => {
      console.log('⏰ Token expired, logging out...');
      logout();
    }, timeUntilExpiry);

    return () => clearTimeout(logoutTimer);
  }, [sessionExpiry]);

  const login = (userData, accessToken, refreshToken) => {
    console.log('🔐 Login called with:', userData);
    
    setUser(userData);
    setToken(accessToken);
    
    localStorage.setItem('access', accessToken);
    localStorage.setItem('refresh', refreshToken);
    localStorage.setItem('user', JSON.stringify(userData));
    
    checkTokenExpiry();
    
    console.log('✅ Login successful, user saved');
  };

  const logout = () => {
    console.log('🚪 Logout called');
    
    setUser(null);
    setToken(null);
    setSessionExpiry(null);
    
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    
    if (!window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
    
    console.log('✅ Logout successful');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (token) {
        const isValid = checkTokenExpiry();
        if (!isValid) {
          console.log('⚠️ Token expired during periodic check');
          logout();
        }
      }
    }, 60000); 

    return () => clearInterval(interval);
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};