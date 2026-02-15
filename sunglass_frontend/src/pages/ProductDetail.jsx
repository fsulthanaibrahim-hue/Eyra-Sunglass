import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    API.get(`products/${id}/`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const addToCart = () => {
    if (!user) return alert("Login first");
    API.post('cart/', { product: product.id, quantity: 1 })
      .then(() => alert("Added to cart"))
      .catch(err => console.log(err));
  };

  const addToWishlist = () => {
    if (!user) return alert("Login first");
    API.post('wishlist/', { product: product.id })
      .then(() => alert("Added to wishlist"))
      .catch(err => console.log(err));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 flex gap-6">
        <img className="w-80 h-80 object-cover" src={product.image} alt={product.name} />
        <div>
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-700 my-2">{product.description}</p>
          <p className="text-xl font-semibold">${product.price}</p>
          <div className="flex gap-4 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addToCart}>Add to Cart</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={addToWishlist}>Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
