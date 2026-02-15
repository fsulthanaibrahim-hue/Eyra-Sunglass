import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function Cart() {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      API.get('cart/')
        .then(res => setCart(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  const removeItem = (id) => {
    API.delete(`cart/${id}/`)
      .then(() => setCart(cart.filter(item => item.id !== id)))
      .catch(err => console.log(err));
  };

  if (!user) return <div className="p-4">Please login to view your cart</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded shadow">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${item.product.price * item.quantity}</span>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
