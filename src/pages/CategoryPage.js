import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/templates/Layout';
import NewsCategory from '../components/organisms/NewsCategory';
import NewsBanner from '../components/organisms/NewsBanner';
import FeaturedNews from '../components/organisms/FeaturedNews';
import WeatherWidget from '../components/organisms/WeatherWidget';
import TrendingTopics from '../components/organisms/TrendingTopics';
import LiveNewsStream from '../components/organisms/LiveNewsStream';
import { fetchNews } from '../services/newsService';

export default function CategoryPage() {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      try {
        const articles = await fetchNews(category, 20);
        const filteredArticles = articles?.filter(article => 
          article.title && 
          article.url && 
          !article.title.includes('Removed') && 
          !article.description?.includes('Removed')
        );
        setNews(filteredArticles);
      } catch (error) {
        console.error('Error fetching category news:', error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchCategoryNews();
    }
  }, [category]);

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : '';

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1 
          className="text-4xl font-bold mb-8 capitalize"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {categoryTitle} News
        </motion.h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8"
            >
              <div className="lg:col-span-2">
                <NewsBanner article={news[0]} />
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <NewsCategory 
                title={`${category.charAt(0).toUpperCase() + category.slice(1)} News`} 
                articles={news}
                onShare={handleShare}
                onSave={handleSave}
                savedArticles={savedArticles}
              />
              <div className="mt-4">
                <a href={`/category/${category}`} className="text-blue-500 hover:underline">View All</a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8"
            >
              <FeaturedNews articles={news} />
            </motion.div>
          </>
        )}
      </div>
    </Layout>
  );
}