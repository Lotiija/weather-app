import React, { useEffect, useState } from 'react'
import Search from '../search';
import './style.css';

const Weather = () => {
  const [search, setSearch] = useState('');
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeatherData(params) {
    try {
      setLoading(true)
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=caa7e1838b36f4de215ddbb3d548a4aa`)
      const data = await response.json()
      setLoading(false);

      setWeatherData(data);
      
    } catch (error) {
      setError(error.msg);
      setLoading(false);
      
    }
  }

  console.log(weatherData);

  const handleSearch = () => {
    fetchWeatherData(search)
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-us', {
      weekday : 'long',
      month : 'long',
      day : 'numeric',
      year : 'numeric'
    })
  }

  useEffect(() => {
    fetchWeatherData('Lagos')
  }, []);

  if(loading) {
    return <div>loading...!</div>
  }

  if (error) {
    return <div>Error Occurred... !</div>
  }

  return (
    <div className='container'>
      <Search 
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      <div>
        <div className="city-name">
          <h2>{weatherData?.name} <span>{weatherData?.sys?.country}</span></h2>
        </div>
        <div className="date">
          <span>{getCurrentDate}</span>
        </div>
        <div className='temp'>{weatherData?.main?.temp}</div>
        <p className="description">
          {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ""}
        </p>
        <div className='weather-info'>
          <div className='column'>
            <div>
              <p className="wind">{weatherData?.wind?.speed}</p>
              <p>Wind Speed</p>
            </div>
          </div>
          <div className='column'>
            <div>
              <p className="humidity">{weatherData?.main?.humidity}</p>
              <p>Humidity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;