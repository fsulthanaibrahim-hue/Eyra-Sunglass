import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SessionTimer() {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (!user) return;

    const calculateTimeLeft = () => {
      const token = localStorage.getItem('access');
      if (!token) return null;

      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));
        
        const exp = payload.exp * 1000;
        const now = Date.now();
        const diff = exp - now;
        
        if (diff <= 0) return null;
        
        const minutes = Math.floor(diff / 1000 / 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        return { minutes, seconds };
      } catch (e) {
        return null;
      }
    };

    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
      
      if (time && time.minutes <= 5 && time.minutes > 0) {
        console.log(`⚠️ Session expires in ${time.minutes} minutes`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [user]);

  if (!user || !timeLeft) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
      <span>Session: {timeLeft.minutes}:{timeLeft.seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}