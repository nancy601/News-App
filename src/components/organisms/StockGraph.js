import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { io } from 'socket.io-client';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const STOCK_GRAPH_ENDPOINT = 'http://localhost:4000';

const StockGraph = () => {
  const [stockName, setStockName] = useState(''); // State for stock name
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Price',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        pointRadius: 3,
        tension: 0.4, // Smooth line
      },
    ],
  });

  useEffect(() => {
    const socket = io(STOCK_GRAPH_ENDPOINT);

    socket.on('stockPriceUpdate', ({ name, price }) => {
      console.log("Received price:", price); // Debug line
      setStockName(name);
      setData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, parseFloat(price)],
          },
        ],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price ($)',
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: `Live Stock Price Graph for ${stockName}`,
      },
    },
    animation: {
      duration: 500,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Line data={data} options={options} />
    </div>
  );
};

export default StockGraph;
