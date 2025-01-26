import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Bookmark, TrendingUp, Radio } from 'lucide-react';
import Layout from '../components/templates/Layout';
import NewsBanner from '../components/organisms/NewsBanner';
import NewsCategory from '../components/organisms/NewsCategory';
import StockTicker from '../components/organisms/StockTicker';
import StockGraph from '../components/organisms/StockGraph';
import AudioVideoSection from '../components/organisms/AudioVideoSection';
import FeaturedNews from '../components/organisms/FeaturedNews';
import NewsUpdates from '../components/organisms/NewsUpdates';
import VotingPoll from '../components/organisms/VotingPoll';
import WeatherWidget from '../components/organisms/WeatherWidget';
import TrendingTopics from '../components/organisms/TrendingTopics';
import LiveNewsStream from '../components/organisms/LiveNewsStream';
import NewsletterSignup from '../components/organisms/NewsletterSignup';
import { fetchNews } from '../services/newsService';

const categories = [
  { id: 'world', name: 'World News' },
  { id: 'financial', name: 'Financial' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'technology', name: 'Technology' },
  { id: 'sports', name: 'Sports' },
];

const HomePage = () => {
  const [breakingNews, setBreakingNews] = useState(null);
  const [topNews, setTopNews] = useState([]);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [categoryNews, setCategoryNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      setLoading(true);
      try {
        const general = await fetchNews('general', 11);
        const filteredGeneral = general?.filter(article => 
          article.title && 
          article.url && 
          !article.title.includes('Removed') && 
          !article.description?.includes('Removed')
        );
        setBreakingNews(filteredGeneral[0]);
        setTopNews(filteredGeneral.slice(1));

        const categories = ['world', 'financial', 'entertainment', 'lifestyle', 'technology', 'sports'];
        const newsPromises = categories.map(category => fetchNews(category, 10));
        const newsResults = await Promise.all(newsPromises);

        const categoryNewsObj = {};
        categories.forEach((category, index) => {
          categoryNewsObj[category] = newsResults[index]?.filter(article => 
            article.title && 
            article.url && 
            !article.title.includes('Removed') && 
            !article.description?.includes('Removed')
          );
        });

        setCategoryNews(categoryNewsObj);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  const handleShare = (article) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        url: article.url
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert(`Share this article: ${article.url}`);
    }
  };

  const handleSave = (article) => {
    setSavedArticles(prev => {
      if (prev.some(savedArticle => savedArticle.url === article.url)) {
        return prev.filter(savedArticle => savedArticle.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className="lg:col-span-2">
            <NewsBanner article={breakingNews} />
          </div>
          <div>
            <WeatherWidget />
            <div className='mt-8'> 
              <TrendingTopics />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <LiveNewsStream />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b-2 border-gray-200">Top Headlines</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {topNews.map((article, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-gray-50 p-4 rounded-lg transition duration-300 hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-300">
                        {article.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{article.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                      <div className="flex space-x-2">
                        <button onClick={() => handleShare(article)} className="text-blue-500 hover:text-blue-600">
                          <Share2 size={20} />
                        </button>
                        <button onClick={() => handleSave(article)} className="text-blue-500 hover:text-blue-600">
                          <Bookmark size={20} fill={savedArticles.some(savedArticle => savedArticle.url === article.url) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-8"
          >
            <AudioVideoSection />
            {/* <TrendingTopics /> */}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className="lg:col-span-2">
            <NewsUpdates articles={topNews.slice(0, 9)} />
          </div>
          <div>
            <FeaturedNews articles={topNews.slice(0, 20)} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
        >
          <div className="lg:col-span-2 space-y-8">
            <StockTicker />
            <StockGraph />
          </div>
          <div className="space-y-8">
            <VotingPoll />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-600 hover:underline">Today's Events</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Upcoming Conferences</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Job Opportunities</a></li>
                <li><a href="#" className="text-blue-600 hover:underline">Community Forums</a></li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="mt-8">
          <div className="flex space-x-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition duration-300 ${activeCategory === category.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <NewsCategory 
              title={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`} 
              articles={categoryNews[activeCategory] || []}
              onShare={handleShare}
              onSave={handleSave}
              savedArticles={savedArticles}
            />
            <div className="mt-4">
              <a href={`/category/${activeCategory}`} className="text-blue-500 hover:underline">
              View All {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div className="space-y-12 mb-8">

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
          className="mb-12"
        > */}
          <NewsletterSignup />
        </motion.div>
      </div>
    </Layout>
  );
};

export default HomePage;