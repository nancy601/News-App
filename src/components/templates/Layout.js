import React from 'react';
import Navbar from '../organisms/Navbar';

const categories = [
  { name: 'World News', path: '/category/world' },
  { name: 'National', path: '/category/national' },
  { name: 'Financial', path: '/category/financial' },
  { name: 'Entertainment', path: '/category/entertainment' },
  { name: 'Lifestyle', path: '/category/lifestyle' },
  { name: 'Technology', path: '/category/technology' },
  { name: 'Travel', path: '/category/travel' },
  { name: 'Sports', path: '/category/sports' },
];

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <ul className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <li key={category.name}>
                    <a href={category.path} className="hover:text-blue-400 transition duration-300">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="flex items-center mb-2">
                <i className="fas fa-phone mr-2"></i>
                9876543210
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-envelope mr-2"></i>
                abc@gmail.com
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Mumbai, India
              </p>
              <div className="mt-4 space-x-4">
                <a href="#" className="text-2xl hover:text-blue-400 transition duration-300">
                  <i className="fab fa-facebook-square"></i>
                </a>
                <a href="#" className="text-2xl hover:text-pink-400 transition duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-2xl hover:text-red-500 transition duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Here" 
                  className="px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 News App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;