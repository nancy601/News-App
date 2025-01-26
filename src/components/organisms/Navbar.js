import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Home', path: '/' },
  { name: 'World News', path: '/category/world' },
  { name: 'National', path: '/category/national' },
  { name: 'Financial', path: '/category/financial' },
  { name: 'Entertainment', path: '/category/entertainment' },
  { name: 'Lifestyle', path: '/category/lifestyle' },
  { name: 'Technology', path: '/category/technology' },
  { name: 'Travel', path: '/category/travel' },
  { name: 'Sports', path: '/category/sports' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold hover:text-blue-400 transition duration-300">NEWS</Link>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.path} className="hover:text-blue-400 transition duration-300">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
              {isMenuOpen ? (
                <i className="fas fa-times"></i>
              ) : (
                <i className="fas fa-bars"></i>
              )}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <nav className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to={category.path} 
                    className="block py-2 hover:text-blue-400 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}