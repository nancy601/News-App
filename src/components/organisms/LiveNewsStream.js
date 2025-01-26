import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

const LiveNewsStream = () => {
  const newsItems = [
    "Breaking: Major tech company announces new AI breakthrough",
    "Global climate summit reaches historic agreement",
    "Sports: Underdog team wins championship in stunning upset",
    "Entertainment: Acclaimed director announces retirement",
    "Economy: Stock market reaches all-time high",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-red-600 text-white p-4 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-2 flex items-center">
        <Radio className="mr-2 animate-pulse" />
        Live News Stream
      </h2>
      <div className="overflow-hidden h-12">
        <motion.div
          animate={{
            y: ["0%", "-100%"],
            transition: {
              y: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            },
          }}
          className="whitespace-nowrap"
        >
          {newsItems.concat(newsItems).map((item, index) => (
            <span key={index} className="inline-block mr-8">{item}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveNewsStream;