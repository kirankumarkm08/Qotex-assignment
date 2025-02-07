import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/WeatherInfo.module.css";

const WeatherInfo: React.FC = () => {
  const { weatherData, isLoading } = useWeather();

  if (isLoading || !weatherData) return null;

  return (
    <div className={styles.weatherInfo}>
      <h2>{weatherData.city}</h2>
      <img
        src={weatherData?.icon || "/placeholder.svg"}
        alt={weatherData.condition}
        className={styles.weatherIcon}
      />
      <p className={styles.temperature}>
        {weatherData.temperature.toFixed(1)}°C
      </p>
      <p className={styles.condition}>{weatherData.condition}</p>
      <div className={styles.details}>
        <p>Humidity: {weatherData.humidity}%</p>
        <p>Wind Speed: {weatherData.windSpeed.toFixed(1)} m/s</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
