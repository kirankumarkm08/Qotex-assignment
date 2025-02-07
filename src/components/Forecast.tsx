import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/Foracast.module.css";

const Forecast: React.FC = () => {
  const { weatherData, unit } = useWeather();

  if (!weatherData) return null;

  return (
    <div className={styles.forecast}>
      <h3>5-Day Forecast</h3>
      <div className={styles.forecastItems}>
        {weatherData.forecast.map((day, index) => (
          <div key={index} className={styles.forecastItem}>
            <p>{day.date}</p>
            <img src={day.icon || "/placeholder.svg"} alt={day.condition} />
            <p>
              {unit === "celsius"
                ? day.temperature
                : (day.temperature * 9) / 5 + 32}
              °{unit === "celsius" ? "C" : "F"}
            </p>
            <p>{day.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
