import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition w-48">
      <img className="w-full h-40 object-cover mb-2" src={product.image} alt={product.name} />
      <h3 className="font-bold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link className="text-blue-500 hover:underline" to={`/product/${product.id}`}>View</Link>
    </div>
  );
}
