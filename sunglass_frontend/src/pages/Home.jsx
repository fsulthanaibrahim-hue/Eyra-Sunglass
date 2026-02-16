import Navbar from "../components/Navbar";
import { Award, Truck, Headphones } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-24 md:py-32 flex flex-col md:flex-row items-center gap-8">
          {/* Text Left */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Your <br /> Signature Scent
            </h1>
            <p className="text-gray-700 text-lg md:text-xl mb-8">
              Experience the art of fine fragrance. Each bottle is meticulously crafted using rare ingredients and traditional techniques perfected over generations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/products"
                className="bg-gray-800 text-white font-bold px-6 py-3 rounded-md shadow-lg hover:bg-gray-700 transition"
              >
                Shop Collection
              </a>
              <a
                href="/consultation"
                className="text-gray-800 font-semibold px-6 py-3 rounded-md hover:text-yellow-500 transition"
              >
                Book Consultation
              </a>
            </div>
          </div>

          {/* Image Right */}
          <div className="md:w-1/2">
            <img
              src="/images/home2.jpg"
              alt="sunglass"
              className="w-full h-[450px] md:h-[500px] object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Explore Our Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { img: "/images/home1.jpg", text: "Women's Collection" },
            { img: "/images/home7.jpg", text: "Kids Collection" },
            { img: "/images/home3.jpg", text: "Men's Collection" },
          ].map((item, idx) => (
            <div key={idx} className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <img
                src={item.img}
                alt={item.text}
                className="w-full h-64 md:h-72 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-4 left-4 text-gray-50 font-bold text-lg bg-gray-800 bg-opacity-40 px-2 py-1 rounded">
                {item.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto py-16 px-4 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { img: "/images/home5.jpg", name: "GlamEdge", price: 2999 },
            { img: "/images/home8.jpg", name: "SunX", price: 2499 },
            { img: "/images/home10.jpg", name: "RayBolt", price: 2599 },
            { img: "/images/home9.jpg", name: "FelineLux", price: 2299 },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-gray-800 font-bold text-lg">₹ {item.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full h-[500px] md:h-[700px] overflow-hidden mb-16 relative">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          src="/images/video1.mp4"
        />
      </section>

      {/* About EYRA */}
      <section className="max-w-7xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <img 
            src="/images/home5.jpg" 
            alt="About EYRA" 
            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About EYRA</h2>
          <p className="text-gray-600 mb-4">
            EYRA is committed to providing premium sunglasses that combine style, comfort, and protection. 
            Our collections are carefully crafted for Men, Women, and Kids who love to make a statement with their eyewear.
          </p>
          <p className="text-gray-600 mb-6">
            With a focus on quality and design, EYRA ensures that every pair of sunglasses meets the highest standards. 
            Experience fashion-forward eyewear that keeps your eyes safe while looking amazing.
          </p>
          <a 
            href="/about" 
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3 rounded-md shadow-lg transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="max-w-7xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose EYRA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <Award size={48} className="text-yellow-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">Premium Quality</h3>
            <p className="text-gray-600 text-center">Top-grade lenses & frames designed for comfort and style.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <Truck size={48} className="text-yellow-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-center">Get your favorite sunglasses delivered quickly to your door.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow hover:shadow-xl transition transform hover:-translate-y-2">
            <Headphones size={48} className="text-yellow-500 mb-4" />
            <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-center">Our team is always ready to assist you with any questions.</p>
          </div>
        </div>
      </section>

      {/* Newsletter / Subscription Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block bg-white px-4 py-2 rounded-full shadow mb-4 font-semibold text-sm">
            EXCLUSIVE OFFERS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our <span className="text-yellow-600">Exclusive</span> Club
          </h2>
          <p className="text-gray-700 mb-6">
            Subscribe to receive updates on new arrivals, exclusive offers, and fashion tips
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-80"
            />
            <button
              type="submit"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition font-semibold"
            >
              Subscribe
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            By subscribing, you agree to our Privacy Policy
          </p>
        </div>
      </section>

      {/* Footer */}
     <footer className="bg-gray-50 text-gray-700 mt-16 border-t border-gray-200">
       <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
       {/* Brand + Social */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">EYRA</h2>
          <p className="text-gray-600 mb-4">
            Discover the latest trends in sunglasses for Men, Women & Kids. Style meets quality.
          </p>
        <div className="flex space-x-3">
          <a
            href="#"
            className="bg-gray-100 p-2 rounded hover:bg-blue-500 hover:text-white transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="bg-gray-100 p-2 rounded hover:bg-pink-500 hover:text-white transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="bg-gray-100 p-2 rounded hover:bg-blue-400 hover:text-white transition"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

       {/* Quick Links */}
       <div>
         <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
         <ul className="space-y-2">
           <li><a href="/" className="hover:text-yellow-500 transition">Home</a></li>
           <li><a href="/products" className="hover:text-yellow-500 transition">Products</a></li>
           <li><a href="/about" className="hover:text-yellow-500 transition">About Us</a></li>
           <li><a href="/contact" className="hover:text-yellow-500 transition">Contact</a></li>
         </ul>
       </div>

       {/* Customer Service */}
       <div>
         <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Service</h3>
         <ul className="space-y-2">
           <li><a href="/about" className="hover:text-yellow-500 transition">About Us</a></li>
           <li><a href="/contact" className="hover:text-yellow-500 transition">Contact Us</a></li>
           <li><a href="/shipping" className="hover:text-yellow-500 transition">Shipping Policy</a></li>
           <li><a href="/returns" className="hover:text-yellow-500 transition">Returns & Exchanges</a></li>
         </ul>
       </div>

      {/* Contact */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
        <p className="flex items-center gap-2 mb-2">
          <span>📍</span> 123 Fashion Street, New York
        </p>
        <p className="flex items-center gap-2 mb-2">
          <span>📞</span> +91 9087654321
        </p>
        <p className="flex items-center gap-2">
          <span>✉️</span> support@eyra.com
        </p>
      </div>
     </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-200 mt-8 py-4 text-gray-500 text-sm flex flex-col md:flex-row justify-between px-4 max-w-7xl mx-auto">
      <span>© {new Date().getFullYear()} EYRA. All rights reserved.</span>
       <div className="flex space-x-4 mt-2 md:mt-0">
         <a href="/privacy" className="hover:text-yellow-500 transition">Privacy Policy</a>
         <a href="/terms" className="hover:text-yellow-500 transition">Terms of Service</a>
         <a href="/cookies" className="hover:text-yellow-500 transition">Cookie Policy</a>
       </div>
    </div>
  </footer>
 </div>
  );
}
