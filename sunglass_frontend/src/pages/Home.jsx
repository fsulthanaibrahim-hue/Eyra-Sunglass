// src/pages/Home.jsx
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />

      {/* Hero Image */}
      <div className="pt-20 w-full h-[500px]">
        <img
          src="/images/hero4.jpg"
          alt="Hero"
          className="w-full h-180 object-cover"
        />
      </div>

      {/* Welcome Section */}
      <section className="ml-230 mb-50">
        <h1 className="text-4xl font-bold">
          Welcome to EYRA
        </h1>

        <p className="text-gray-600 mt-2 mb-6">
          The best sunglasses online - quality you can trust!
        </p>

        <a
          href="/products"
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-md shadow-lg transition"
        >
          Shop Now
        </a>
      </section>

      {/* Collection Section */}
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold mb-2">
          Explore Our Collections
        </h2>

        <p className="text-gray-600">
          Stylish sunglasses for every occasion. Find your perfect pair today.
        </p>
      </section>
    </div>
  );
}
