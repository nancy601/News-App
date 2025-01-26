import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Bookmark, ArrowRight } from 'lucide-react';

const NewsCategory = ({ title, articles, onShare, onSave, savedArticles }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-gray-200">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition duration-300 hover:shadow-lg"
          >
            <img 
              src={article.urlToImage || '/placeholder.svg?height=200&width=400'} 
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition duration-300">
                  {article.title}
                </a>
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                <div className="flex space-x-2">
                  <motion.button
                    onClick={() => onShare(article)}
                    className="text-blue-500 hover:text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Share2 size={20} />
                  </motion.button>
                  <motion.button
                    onClick={() => onSave(article)}
                    className="text-blue-500 hover:text-blue-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Bookmark
                      size={20}
                      fill={savedArticles.some(savedArticle => savedArticle.url === article.url) ? 'currentColor' : 'none'}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.a
          href={`/category/${title.toLowerCase().replace(' ', '-')}`}
          // className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-full font-semibold text-sm hover:bg-blue-600 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* View All {title} <ArrowRight className="ml-2 h-4 w-4" /> */}
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default NewsCategory;