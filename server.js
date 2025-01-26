const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Adjust based on your needs
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

// Simulated stock data
let stocks = [
  { name: 'Apple', price: 150 },
  { name: 'Google', price: 2800 },
  { name: 'Amazon', price: 3300 },
];

// Simulate stock price updates
setInterval(() => {
  stocks = stocks.map(stock => ({
    ...stock,
    price: parseFloat((Math.random() * 100 + parseFloat(stock.price)).toFixed(2)), // Ensure price is a number
  }));
  // console.log("Updated stocks:", stocks); // Debug line
  io.emit('stockUpdate', stocks);
  io.emit('stockPriceUpdate', { name: stocks[0].name, price: stocks[0].price }); // Emit first stock's data for the graph
}, 3000); // Update every 3 seconds

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
