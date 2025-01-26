import React from 'react';

const NewsBanner = ({ article }) => {
  if (!article) return null;

  return (
    <div className="bg-red-600 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">Breaking News</h2>
        <h3 className="text-xl font-semibold mb-2">
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {article.title}
          </a>
        </h3>
        <p className="text-sm mb-4">{article.description}</p>
      </div>
      {article.urlToImage && (
        <img 
          src={article.urlToImage} 
          alt={article.title} 
          className="w-full h-64 object-cover"
        />
      )}
    </div>
  );
};

export default NewsBanner;