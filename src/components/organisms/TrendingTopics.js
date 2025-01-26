import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingTopics = () => {
  const topics = ['COVID-19', 'Climate Change', 'Artificial Intelligence', 'Space Exploration', 'Cryptocurrency'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <TrendingUp className="mr-2" />
        Trending Topics
      </h2>
      <ul className="space-y-2">
        {topics.map((topic, index) => (
          <li key={index} className="flex items-center">
            <span className="text-blue-500 font-semibold mr-2">#{index + 1}</span>
            <a href="#" className="text-gray-800 hover:text-blue-600 transition duration-300">
              {topic}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingTopics;