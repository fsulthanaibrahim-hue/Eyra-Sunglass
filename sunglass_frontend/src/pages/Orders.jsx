import { useEffect, useState, useContext } from 'react';
import API from '../api/axios';
import Navbar from '../components/Navbar';
import { AuthContext } from '../context/AuthContext';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      API.get('orders/')
        .then(res => setOrders(res.data))
        .catch(err => console.log(err));
    }
  }, [user]);

  if (!user) return <div className="p-4">Please login to view your orders</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map(order => (
              <div key={order.id} className="border p-4 rounded shadow flex flex-col gap-2">
                <span>Order #{order.id} - Status: <span className="font-semibold">{order.status}</span></span>
                <ul className="list-disc ml-5">
                  {order.products.map(item => (
                    <li key={item.id}>{item.product.name} x {item.quantity}</li>
                  ))}
                </ul>
                <span className="font-bold">Total: ${order.total_price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
