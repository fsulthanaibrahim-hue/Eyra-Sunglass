import { useEffect, useState, useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  Package, Calendar, ChevronLeft, MapPin, Phone, User,
  CreditCard, Truck, CheckCircle, XCircle, Clock,
  ShoppingBag, Home, Mail, AlertCircle, Image as ImageIcon
} from 'lucide-react';

export default function OrderDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => { 
    fetchOrder(); 
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/orders/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log('📦 Order data received:', response.data);
      setOrder(response.data);
      
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    setCancelling(true);
    
    try {
      setOrder(prevOrder => ({
        ...prevOrder,
        status: 'cancelled'
      }));
      
      toast.success('Order cancelled successfully');
      
      setTimeout(async () => {
        try {
          await API.post(`/orders/${id}/cancel/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (error) {
          console.log('Background sync error:', error);
        }
      }, 100);
      
    } catch (error) {
      console.error('Error in cancel:', error);
      toast.error('Failed to cancel order');
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered':
        return {
          bg: 'bg-green-100',
          text: 'text-green-700',
          icon: <CheckCircle size={16} className="text-green-600" />,
          label: 'Delivered'
        };
      case 'cancelled':
        return {
          bg: 'bg-red-100',
          text: 'text-red-700',
          icon: <XCircle size={16} className="text-red-600" />,
          label: 'Cancelled'
        };
      case 'shipped':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: <Truck size={16} className="text-blue-600" />,
          label: 'Shipped'
        };
      case 'pending':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          icon: <Clock size={16} className="text-yellow-600" />,
          label: 'Pending'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: <Package size={16} className="text-gray-600" />,
          label: status || 'Unknown'
        };
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/media') || imagePath.startsWith('/uploads')) {
      return `http://127.0.0.1:8000${imagePath}`;
    }
    if (!imagePath.includes('/')) {
      return `http://127.0.0.1:8000/media/products/${imagePath}`;
    }
    return `http://127.0.0.1:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const getItemImage = (item) => {
    if (!item) return null;
    const possibleImages = [
      item.product_image,
      item.product?.image,
      item.image,
      item.product?.images?.[0]?.image,
      item.product?.images?.[0],
      item.thumbnail,
      item.product?.thumbnail,
      item.product && typeof item.product === 'object' ? item.product.image : null
    ];
    for (const img of possibleImages) {
      if (img) return img;
    }
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F2EC]">
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="w-16 h-16 border-4 border-[#C9974A]/20 border-t-[#C9974A] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!order) return null;

  const statusBadge = getStatusBadge(order.status);
  const isCancelled = order.status?.toLowerCase() === 'cancelled';
  const canCancel = order.status?.toLowerCase() === 'pending';
  const hasAddress = order.full_name || order.address_line1 || order.city || order.phone;

  return (
    <div className="min-h-screen bg-[#F7F2EC] font-['Jost',sans-serif]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Back Button */}
        <Link 
          to="/orders" 
          className="inline-flex items-center gap-2 text-[#C9974A] hover:text-[#1C1612] transition-colors mb-6 group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs tracking-wider uppercase font-medium">Back to Orders</span>
        </Link>

        {/* Order Header */}
        <div className="bg-white border border-[#6B4F3A]/10 rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-[#6B4F3A]/10 bg-gradient-to-r from-[#1C1612]/5 to-transparent">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full ${statusBadge.bg} flex items-center justify-center`}>
                  {statusBadge.icon}
                </div>
                <div>
                  <h1 className="font-['Cormorant_Garamond',serif] text-3xl text-[#1C1612]">
                    Order #{order.order_number || order.id}
                  </h1>
                  <div className="flex items-center gap-3 mt-1">
                    <Calendar size={14} className="text-[#9A8070]" />
                    <p className="text-sm text-[#9A8070]">{formatDate(order.created_at)}</p>
                  </div>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full ${statusBadge.bg} ${statusBadge.text} text-sm font-medium flex items-center gap-2`}>
                {statusBadge.icon}
                <span>{statusBadge.label}</span>
              </div>
            </div>
          </div>

          {/* Order Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#6B4F3A]/10">
            <div className="p-4 text-center">
              <p className="text-xs text-[#9A8070] mb-1">Total Items</p>
              <p className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612]">
                {order.items?.length || 0}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-[#9A8070] mb-1">Total Amount</p>
              <p className="font-['Cormorant_Garamond',serif] text-xl text-[#C9974A]">
                ₹{order.total_price || order.total_amount || 0}
              </p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-[#9A8070] mb-1">Payment</p>
              <p className="text-sm text-[#1C1612]">Cash on Delivery</p>
            </div>
            <div className="p-4 text-center">
              <p className="text-xs text-[#9A8070] mb-1">Status</p>
              <p className={`text-sm font-medium ${statusBadge.text}`}>{statusBadge.label}</p>
            </div>
          </div>
        </div>

        {/* Order Items with Images */}
        <div className="bg-white border border-[#6B4F3A]/10 rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-[#6B4F3A]/10">
            <div className="flex items-center gap-2">
              <ShoppingBag size={18} className="text-[#C9974A]" />
              <h2 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612]">Order Items</h2>
            </div>
          </div>
          
          <div className="divide-y divide-[#6B4F3A]/10">
            {order.items?.map((item, idx) => {
              const imageUrl = getItemImage(item);
              const itemName = item.product_name || item.name || item.product?.name || 'Product';
              
              return (
                <div key={idx} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-[#F7F2EC]/50 transition-colors">
                  {/* Product Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#F7F2EC] rounded-lg border border-[#6B4F3A]/10 overflow-hidden flex-shrink-0 shadow-md mx-auto sm:mx-0">
                    {imageUrl ? (
                      <img 
                        src={getImageUrl(imageUrl)} 
                        alt={itemName}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          console.log('Image load failed for item:', itemName);
                          e.target.onerror = null;
                          e.target.src = `https://placehold.co/112x112/F7F2EC/C9974A?text=${itemName.charAt(0)}`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#F7F2EC] to-[#E8DDD2]">
                        <ImageIcon size={32} className="text-[#C9974A]/30 mb-1" />
                        <span className="text-xs text-[#C9974A]/50">{itemName.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link to={`/products/${item.product?.id}`} className="hover:underline inline-block">
                      <h3 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612] mb-2">
                        {itemName}
                      </h3>
                    </Link>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
                      <div className="bg-[#F7F2EC] px-3 py-1.5 rounded-lg">
                        <p className="text-[#9A8070] text-xs">Price</p>
                        <p className="text-[#1C1612] font-medium">₹{item.price}</p>
                      </div>
                      
                      <div className="bg-[#F7F2EC] px-3 py-1.5 rounded-lg">
                        <p className="text-[#9A8070] text-xs">Quantity</p>
                        <p className="text-[#1C1612] font-medium">{item.quantity}</p>
                      </div>
                      
                      <div className="bg-[#F7F2EC] px-3 py-1.5 rounded-lg">
                        <p className="text-[#9A8070] text-xs">Subtotal</p>
                        <p className="text-[#C9974A] font-semibold">₹{(item.quantity || 0) * (item.price || 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white border border-[#6B4F3A]/10 rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-[#6B4F3A]/10">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#C9974A]" />
              <h2 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612]">Shipping Address</h2>
            </div>
          </div>
          
          <div className="p-6">
            {hasAddress ? (
              <div className="space-y-4">
                {order.full_name && (
                  <div className="flex items-start gap-3">
                    <User size={18} className="text-[#C9974A] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9A8070] uppercase tracking-wider">Full Name</p>
                      <p className="text-base text-[#1C1612] font-medium">{order.full_name}</p>
                    </div>
                  </div>
                )}
                
                {order.phone && (
                  <div className="flex items-start gap-3">
                    <Phone size={18} className="text-[#C9974A] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9A8070] uppercase tracking-wider">Phone Number</p>
                      <p className="text-base text-[#1C1612] font-medium">{order.phone}</p>
                    </div>
                  </div>
                )}
                
                {(order.address_line1 || order.city || order.state) && (
                  <div className="flex items-start gap-3">
                    <Home size={18} className="text-[#C9974A] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9A8070] uppercase tracking-wider">Address</p>
                      {order.address_line1 && (
                        <p className="text-base text-[#1C1612] font-medium">{order.address_line1}</p>
                      )}
                      {order.address_line2 && (
                        <p className="text-base text-[#1C1612] font-medium">{order.address_line2}</p>
                      )}
                      <p className="text-base text-[#1C1612] font-medium">
                        {[
                          order.city,
                          order.state,
                          order.pincode
                        ].filter(Boolean).join(', ')}
                      </p>
                      {order.country && (
                        <p className="text-base text-[#1C1612] font-medium">{order.country}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle size={48} className="text-[#C9974A]/30 mx-auto mb-4" />
                <h3 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612] mb-2">No Shipping Address</h3>
                <p className="text-[#9A8070] text-sm max-w-md mx-auto">
                  This order was placed without saving address details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-[#6B4F3A]/10 rounded-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-[#6B4F3A]/10">
            <div className="flex items-center gap-2">
              <CreditCard size={18} className="text-[#C9974A]" />
              <h2 className="font-['Cormorant_Garamond',serif] text-xl text-[#1C1612]">Payment Summary</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#9A8070]">Subtotal</span>
                <span className="text-[#1C1612] font-medium">₹{order.total_price || order.total_amount || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#9A8070]">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t border-[#6B4F3A]/10 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#1C1612] uppercase tracking-wider">Total</span>
                  <span className="font-['Cormorant_Garamond',serif] text-3xl text-[#C9974A]">
                    ₹{order.total_price || order.total_amount || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        {canCancel && (
          <button
            onClick={handleCancelOrder}
            disabled={cancelling}
            className="w-full bg-transparent border-2 border-red-500 text-red-500 py-4 rounded-lg font-medium text-sm tracking-wider uppercase hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
          >
            {cancelling ? (
              <>
                <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <span>Cancelling...</span>
              </>
            ) : (
              <>
                <XCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span>Cancel Order</span>
              </>
            )}
          </button>
        )}

        {isCancelled && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <XCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="font-['Cormorant_Garamond',serif] text-2xl text-red-700 mb-2">Order Cancelled</h3>
            <p className="text-red-600 text-sm">
              This order was cancelled on {formatDate(order.created_at)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}