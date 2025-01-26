import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
    console.log('Signing up with email:', email);
    setEmail('');
  };

  return (
    <div className="bg-blue-600 text-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Mail className="mr-2" />
        Stay Informed
      </h2>
      <p className="mb-4">Sign up for our newsletter to get the latest news delivered to your inbox.</p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-2 rounded-r-lg font-semibold hover:bg-blue-100 transition duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;