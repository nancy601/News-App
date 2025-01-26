import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Snowflake } from 'lucide-react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ temp: 0, condition: 'Clear', city: 'Loading...' });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = 'a853cf1a298712a369b9d4b3642b8f86'; // Replace with your actual API key
        const city = 'New York'; // You can make this dynamic based on user's location
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          city: data.name
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear':
        return <Sun className="w-10 h-10 text-yellow-400" />;
      case 'Clouds':
        return <Cloud className="w-10 h-10 text-gray-400" />;
      case 'Rain':
        return <CloudRain className="w-10 h-10 text-blue-400" />;
      case 'Snow':
        return <Snowflake className="w-10 h-10 text-blue-200" />;
      default:
        return <Sun className="w-10 h-10 text-yellow-400" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Weather</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getWeatherIcon()}
          <span className="text-4xl font-bold ml-4">{weather.temp}°C</span>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold">{weather.condition}</p>
          <p className="text-sm text-gray-600">{weather.city}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;