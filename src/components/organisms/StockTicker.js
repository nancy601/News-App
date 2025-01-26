import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const STOCK_TICKER_ENDPOINT = 'http://localhost:4000'; // Adjust the endpoint as necessary

const StockTicker = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const socket = io(STOCK_TICKER_ENDPOINT);

    socket.on('stockUpdate', (newStocks) => {
      setStocks(newStocks);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="bg-gray-200 p-4 rounded">
      <h2 className="text-2xl font-bold mb-2">Live Stock Prices</h2>
      <ul>
        {stocks.map((stock, index) => (
          <li key={index} className="flex justify-between">
            <span>{stock.name}</span>
            <span>${stock.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockTicker;
