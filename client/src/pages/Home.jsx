import React from "react";

const Home = () => {
  const categories = [
    { id: 1, name: "Electronics", image: "/images/electronics.jpg" },
    { id: 2, name: "Fashion", image: "/images/fashion.jpg" },
    { id: 3, name: "Home & Kitchen", image: "/images/home-kitchen.jpg" },
    { id: 4, name: "Books", image: "/images/books.jpg" },
  ];

  const products = [
    {
      id: 1,
      name: "Smartphone",
      price: 799.99,
      image: "/images/smartphone.jpg",
    },
    {
      id: 2,
      name: "Headphones",
      price: 199.99,
      image: "/images/headphones.jpg",
    },
    {
      id: 3,
      name: "Sneakers",
      price: 89.99,
      image: "/images/sneakers.jpg",
    },
    {
      id: 4,
      name: "Blender",
      price: 49.99,
      image: "/images/blender.jpg",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-white text-4xl font-bold mb-4 text-center">
            Welcome to E-Shop!
          </h1>
          <p className="text-gray-300 text-lg mb-6 text-center">
            Shop the latest trends and best deals now.
          </p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover transition-transform transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white font-bold text-lg">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers Section */}
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Best Sellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  ${product.price.toFixed(2)}
                </p>
                <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
