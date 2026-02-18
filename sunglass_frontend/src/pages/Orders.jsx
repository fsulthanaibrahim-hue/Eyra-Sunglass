// pages/Orders.jsx (Improved Version)
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  Package, Calendar, ChevronRight, ShoppingBag, 
  Truck, CheckCircle, XCircle, Clock, Image as ImageIcon
} from 'lucide-react';

export default function Orders() {
  const { token } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get('/orders/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('📦 Orders data:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'shipped':
        return <Truck size={16} className="text-blue-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <Package size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // ✅ IMPROVED: Better image URL handling
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    
    // If it's already a full URL
    if (imagePath.startsWith('http')) return imagePath;
    
    // If it's a relative path starting with /media or /uploads
    if (imagePath.startsWith('/media') || imagePath.startsWith('/uploads')) {
      return `http://127.0.0.1:8000${imagePath}`;
    }
    
    // If it's just a filename
    if (!imagePath.includes('/')) {
      return `http://127.0.0.1:8000/media/products/${imagePath}`;
    }
    
    // Default case
    return `http://127.0.0.1:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  // ✅ NEW: Helper function to get first item image from multiple possible sources
  const getFirstItemImage = (order) => {
    if (!order.items || order.items.length === 0) return null;
    
    const firstItem = order.items[0];
    
    // Try all possible image locations
    const possibleImages = [
      firstItem.product_image,
      firstItem.product?.image,
      firstItem.image,
      firstItem.product?.images?.[0]?.image,
      firstItem.product?.images?.[0],
      firstItem.thumbnail,
      firstItem.product?.thumbnail
    ];
    
    // Return the first valid image
    for (const img of possibleImages) {
      if (img) return img;
    }
    
    return null;
  };

  // ✅ NEW: Get first item name
  const getFirstItemName = (order) => {
    if (!order.items || order.items.length === 0) return 'Product';
    
    const firstItem = order.items[0];
    return firstItem.product_name || 
           firstItem.name || 
           firstItem.product?.name || 
           'Product';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#C9974A]/20 border-t-[#C9974A] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
      <Navbar />

      {/* Header Section */}
      <div className="relative pt-28 pb-12 px-4">
        <div className="absolute inset-x-0 top-0 h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1612] via-[#2E1F14] to-[#3A2518]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(201,151,74,0.07)_0%,transparent_65%)] rounded-full pointer-events-none"></div>
          </div>
        </div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-[#C9974A]/10 rounded-full flex items-center justify-center border border-[#C9974A]/30">
            <Package size={28} className="text-[#C9974A]" />
          </div>
          <h1 className="font-['Cormorant_Garamond',serif] text-3xl md:text-4xl font-light text-[#F7F2EC] italic mb-1">
            My Orders
          </h1>
          <p className="text-[#C9974A]/60 text-xs tracking-wider">
            {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Found
          </p>
          <div className="w-12 h-px bg-[#C9974A]/40 mx-auto mt-3"></div>
        </div>
      </div>

      {/* Orders List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {orders.length === 0 ? (
          <div className="bg-white border border-[#6B4F3A]/10 p-10 text-center rounded-lg">
            <Package size={40} className="text-[#C9974A]/30 mx-auto mb-3" />
            <h3 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612] mb-2">No Orders Yet</h3>
            <p className="text-[#6B4F3A]/60 text-xs mb-5">Looks like you haven't placed any orders yet.</p>
            <Link 
              to="/products" 
              className="inline-block bg-[#1C1612] text-[#F7F2EC] px-6 py-2.5 text-xs tracking-wider uppercase font-medium hover:bg-[#C9974A] transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusClass = getStatusColor(order.status);
              const itemCount = order.items?.length || 0;
              
              // ✅ FIXED: Get first item image using helper function
              const firstItemImage = getFirstItemImage(order);
              const firstItemName = getFirstItemName(order);
              
              return (
                <Link
                  key={order.id}
                  to={`/orders/${order.id}`}
                  className="block group"
                >
                  <div className="bg-white border border-[#6B4F3A]/10 rounded-lg overflow-hidden transition-all hover:border-[#C9974A]/40 hover:shadow-lg hover:-translate-y-1">
                    
                    {/* Order Header with Product Image */}
                    <div className="p-4 border-b border-[#6B4F3A]/10 bg-gradient-to-r from-[#1C1612]/5 to-transparent">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* ✅ FIXED: Product Image Preview with better error handling */}
                          <div className="w-16 h-16 bg-[#F7F2EC] rounded-lg border border-[#6B4F3A]/10 overflow-hidden flex-shrink-0 shadow-sm">
                            {firstItemImage ? (
                              <img 
                                src={getImageUrl(firstItemImage)} 
                                alt={firstItemName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  console.log('Image load failed, using fallback');
                                  e.target.onerror = null;
                                  e.target.src = `https://placehold.co/64x64/F7F2EC/C9974A?text=${firstItemName.charAt(0)}`;
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F7F2EC] to-[#E8DDD2]">
                                <span className="text-2xl font-bold text-[#C9974A]/50">
                                  {firstItemName.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <p className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[#1C1612]">
                              Order #{order.order_number || order.id}
                            </p>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Calendar size={12} className="text-[#9A8070]" />
                              <p className="text-xs text-[#9A8070]">
                                {formatDate(order.created_at)}
                              </p>
                            </div>
                            {/* ✅ NEW: Show product name preview */}
                            <p className="text-xs text-[#6B4F3A] mt-1 truncate max-w-[200px]">
                              {firstItemName}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-['Cormorant_Garamond',serif] text-xl font-semibold text-[#C9974A]">
                              ₹{order.total_price || order.total_amount || 0}
                            </p>
                            <div className={`inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium rounded-full ${statusClass}`}>
                              {getStatusIcon(order.status)}
                              <span className="capitalize">{order.status || 'Pending'}</span>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-[#C9974A]/30 group-hover:text-[#C9974A] group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview with Images - Keep existing */}
                    {itemCount > 0 && (
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5">
                            <ShoppingBag size={12} className="text-[#C9974A]" />
                            <p className="text-[10px] text-[#9A8070]">
                              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                            </p>
                          </div>
                          <span className="text-[10px] text-[#9A8070]">View Details →</span>
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                          {order.items.slice(0, 5).map((item, idx) => {
                            // Try multiple image sources for each item
                            const itemImage = item.product_image || 
                                             item.product?.image || 
                                             item.image ||
                                             item.product?.images?.[0]?.image;
                            
                            return (
                              <div 
                                key={idx}
                                className="flex-shrink-0 w-14 h-14 bg-[#F7F2EC] rounded-lg border border-[#6B4F3A]/10 overflow-hidden group-hover:border-[#C9974A]/30 transition-colors shadow-sm"
                              >
                                {itemImage ? (
                                  <img 
                                    src={getImageUrl(itemImage)} 
                                    alt={item.product_name || item.name || 'Product'}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `https://placehold.co/56x56/F7F2EC/C9974A?text=${(item.product_name || item.name || 'P').charAt(0)}`;
                                    }}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#F7F2EC] to-[#E8DDD2]">
                                    <span className="text-lg font-bold text-[#C9974A]/50">
                                      {item.product_name?.charAt(0) || item.name?.charAt(0) || 'P'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {itemCount > 5 && (
                            <div className="flex-shrink-0 w-14 h-14 bg-[#F7F2EC] rounded-lg border border-[#6B4F3A]/10 flex items-center justify-center text-[#1C1612] text-sm font-medium shadow-sm">
                              +{itemCount - 5}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tracking Info */}
                    {order.tracking_number && (
                      <div className="px-4 pb-4">
                        <div className="flex items-center gap-2 text-xs text-[#6B4F3A] bg-[#F7F2EC] p-2 rounded-lg">
                          <Truck size={14} className="text-[#C9974A]" />
                          <span>Tracking: <span className="font-medium text-[#1C1612]">{order.tracking_number}</span></span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}