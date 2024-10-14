import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    const link = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(link);
      console.log(response.data);
      setWeatherData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Could not fetch weather data. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="p-8 max-w-lg w-full bg-gray-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">
          Weather Dashboard
        </h2>

        <div className="flex gap-4 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-semibold"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {weatherData && (
          <div className="bg-gray-700 p-6 rounded-lg">
            <h1 className="text-2xl font-semibold text-center mb-4">
              {weatherData.name}
            </h1>
            <div className="flex flex-col gap-2 text-lg">
              <p>
                <span className="font-medium">Temperature:</span> {weatherData.main.temp}°C
              </p>
              <p>
                <span className="font-medium">Max Temp:</span> {weatherData.main.temp_max}°C
              </p>
              <p>
                <span className="font-medium">Min Temp:</span> {weatherData.main.temp_min}°C
              </p>
              <p>
                <span className="font-medium">Feels Like:</span> {weatherData.main.feels_like}°C
              </p>
              <p>
                <span className="font-medium">Humidity:</span> {weatherData.main.humidity}%
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
