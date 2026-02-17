import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Products() {
  const { token, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistIds, setWishlistIds] = useState(new Set());


  useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/"); // no auth needed if endpoint is public
      setProducts(res.data.results || res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      toast.error("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  // Fetch products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await API.get("/products/", {
  //         headers: token ? { Authorization: `Bearer ${token}` } : {},
  //       });

  //       if (res.data.results) setProducts(res.data.results);
  //       else setProducts(res.data);

  //       // Fetch wishlist if user is logged in
  //       if (user) {
  //         const wishlistRes = await API.get("/wishlist/", {
  //           headers: { Authorization: `Bearer ${token}` },
  //         });
  //         const ids = new Set(wishlistRes.data.map((item) => item.product.id));
  //         setWishlistIds(ids);
  //       }
  //     } catch (err) {
  //       console.error("API ERROR:", err);
  //       if (err.response?.status === 401) {
  //         toast.error("Session expired. Please login again");
  //       } else {
  //         toast.error("Failed to load products");
  //       }
  //       setProducts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, [token, user]);

  // Handle wishlist toggle
  const handleWishlistToggle = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      if (wishlistIds.has(productId)) {
        await API.delete(`/wishlist/${productId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWishlistIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("Removed from wishlist");
      } else {
        await API.post(
          "/wishlist/",
          { product: productId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWishlistIds((prev) => new Set([...prev, productId]));
        toast.success("Added to wishlist");
      }
    } catch (err) {
      console.error("Wishlist error:", err);
      toast.error("Failed to update wishlist");
    }
  };

  // Get product images
  const getProductImages = (product) => {
    if (!product) return [];
    if (product.images && Array.isArray(product.images) && product.images.length > 0)
      return product.images;

    const images = [];
    ["image", "image1", "image2", "image3", "image4"].forEach((key) => {
      if (product[key]) images.push(product[key]);
    });
    return images.length > 0 ? images : [product.image];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-12 text-center space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium products
          </p>
          <div className="w-24 h-1 bg-black mx-auto rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-6"></div>
              <p className="text-xl text-gray-500 font-medium">
                Loading amazing products...
              </p>
            </div>
          ) : products.length === 0 ? (
            <p className="text-center text-xl text-gray-500 py-20">
              No products available.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => {
                const productImages = getProductImages(product);
                const isInWishlist = wishlistIds.has(product.id);

                return (
                  <Link key={product.id} to={`/products/${product.id}`}>
                    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-black transform hover:-translate-y-2">
                      <div className="relative overflow-hidden bg-gray-100 h-64">
                        <img
                          src={`http://127.0.0.1:8000${productImages[0]}`}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <button
                          onClick={(e) => handleWishlistToggle(e, product.id)}
                          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2.5 shadow-lg hover:scale-110 transition-all duration-300"
                        >
                          {isInWishlist ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-red-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-700 group-hover:text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="p-5">
                        <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                          {product.name}
                        </h2>
                        <div className="flex items-center justify-between mt-4">
                          <p className="text-2xl font-bold text-black">
                            ₹{product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
