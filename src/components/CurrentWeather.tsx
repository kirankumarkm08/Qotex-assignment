import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/CurrentWeather.module.css";

const CurrentWeather: React.FC = () => {
  const { weatherData, unit } = useWeather();

  if (!weatherData) return null;

  const { current } = weatherData;
  const temperature =
    unit === "celsius"
      ? current.temperature
      : (current.temperature * 9) / 5 + 32;

  return (
    <div className={styles.currentWeather}>
      <h2>{weatherData.city}</h2>
      <img
        src={current.icon || "/placeholder.svg"}
        alt={current.condition}
        className={styles.weatherIcon}
      />
      <p className={styles.temperature}>
        {temperature.toFixed(1)}°{unit === "celsius" ? "C" : "F"}
      </p>
      <p>{current.condition}</p>
      <p>Humidity: {current.humidity}%</p>
      <p>Wind Speed: {current.windSpeed} m/s</p>
    </div>
  );
};

export default CurrentWeather;
