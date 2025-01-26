import React, { useState, useEffect } from 'react';

export default function FeaturedNews({ articles }) {
  const [activeTab, setActiveTab] = useState('hot');
  const [displayedArticles, setDisplayedArticles] = useState([]);

  useEffect(() => {
    // Simulate different articles for each tab
    const hotNews = articles.slice(0, 5);
    const trendyNews = articles.slice(5, 10);
    const mostWatched = articles.slice(10, 15);

    switch (activeTab) {
      case 'hot':
        setDisplayedArticles(hotNews);
        break;
      case 'trendy':
        setDisplayedArticles(trendyNews);
        break;
      case 'most':
        setDisplayedArticles(mostWatched);
        break;
      default:
        setDisplayedArticles(hotNews);
    }
  }, [activeTab, articles]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-8">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'hot' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('hot')}
        >
          Hot News
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'trendy' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('trendy')}
        >
          Trendy News
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'most' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('most')}
        >
          Most Watched
        </button>
      </div>
      <div className="space-y-4">
        {displayedArticles.map((article, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img 
              src={article.urlToImage || `/placeholder.svg?height=60&width=60`} 
              alt={article.title} 
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h3 className="font-semibold line-clamp-2">{article.title}</h3>
              <p className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}