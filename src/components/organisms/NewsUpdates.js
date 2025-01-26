import React from 'react';

export default function NewsUpdates({ articles }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">News Updates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="relative">
            <img src={article.urlToImage || `/placeholder.svg?height=200&width=300`} alt={article.title} className="w-full h-48 object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
            <p className="text-xs">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}