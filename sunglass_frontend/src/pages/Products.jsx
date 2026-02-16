import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get("/products/")
      .then((res) => {
        console.log("API RESPONSE:", res.data);

        if(res.data.results) {
            setProducts(res.data.results);
        } else {
            setProducts(res.data);
        }
      })
      .catch((err) => {
        console.log("API ERROR:", err);
        setProducts([]);
      });
  }, []);

  return (
    <div>
      <Navbar />

      <section className="pt-24 pb-12 px-6 bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10">
          Our Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={`http://127.0.0.1:8000${product.image}`}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold">
                    {product.name}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
