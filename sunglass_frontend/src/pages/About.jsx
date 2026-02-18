import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Award, Truck, Headphones, Shield, Clock, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <img 
          src="/images/about.jpg" 
          alt="About EYRA"
          className="w-400 h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About EYRA</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto px-4">
              Crafting premium eyewear for the modern world
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Founded in 2020, EYRA began with a simple mission: to create stylish, 
              high-quality eyewear that doesn't break the bank. What started as a 
              small passion project has grown into a trusted brand for thousands of 
              customers worldwide.
            </p>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              We believe that everyone deserves to see the world clearly and look 
              good doing it. That's why we combine cutting-edge technology with 
              timeless design to create frames that are both functional and fashionable.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, EYRA offers a wide range of sunglasses, eyeglasses, and 
              specialty lenses for men, women, and kids. Every pair is crafted 
              with care and precision to ensure the perfect fit and lasting comfort.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src="/images/about-1.jpg" 
              alt="EYRA Workshop"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img 
              src="/images/about-2.jpg" 
              alt="EYRA Craftsmanship"
              className="w-full h-64 object-cover rounded-lg shadow-lg mt-8"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-10 h-10 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-gray-600">
                Premium materials and expert craftsmanship in every pair
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Love</h3>
              <p className="text-gray-600">
                We put our customers at the heart of everything we do
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Authentic</h3>
              <p className="text-gray-600">
                Every product is genuine and comes with warranty
              </p>
            </div>
            <div className="text-center">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timeless Design</h3>
              <p className="text-gray-600">
                Classic styles that never go out of fashion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="/images/about-quality.jpg" 
              alt="Quality Craftsmanship"
              className="w-full h-[400px] object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Uncompromising Quality</h2>
            <p className="text-gray-600 mb-4 text-lg leading-relaxed">
              Every pair of EYRA glasses undergoes rigorous quality testing before 
              it reaches your doorstep. We use only the finest materials - from 
              lightweight titanium frames to scratch-resistant lenses with 100% UV 
              protection.
            </p>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Our lenses are crafted with precision optical technology to ensure 
              crystal-clear vision and maximum comfort, even during extended wear.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-gray-800">10K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-3xl font-bold text-gray-800">100+</p>
                <p className="text-gray-600">Styles Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            The passionate people behind EYRA who work tirelessly to bring you the best eyewear experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Sarah Johnson", role: "Founder & CEO", img: "/images/team-1.jpg" },
              { name: "Michael Chen", role: "Head of Design", img: "/images/team-2.jpg" },
              { name: "Priya Patel", role: "Quality Control", img: "/images/team-3.jpg" },
              { name: "David Kim", role: "Customer Experience", img: "/images/team-4.jpg" },
            ].map((member, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={member.img} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Pair?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Explore our collection of premium eyewear and discover the EYRA difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition transform hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (same as Home page) */}
      <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">EYRA</h2>
            <p className="text-gray-600 mb-4">
              Discover the latest trends in sunglasses for Men, Women & Kids.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-yellow-500">Home</Link></li>
              <li><Link to="/products" className="text-gray-600 hover:text-yellow-500">Products</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-yellow-500">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-yellow-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-gray-600 hover:text-yellow-500">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-yellow-500">Returns</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-yellow-500">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">eyra@gmail.com</p>
            <p className="text-gray-600">+91 9087654321</p>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} EYRA. All rights reserved.
        </div>
      </footer>
    </div>
  );
}