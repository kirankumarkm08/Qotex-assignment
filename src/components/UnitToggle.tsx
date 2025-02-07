import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/UnitToggle.module.css";

const UnitToggle: React.FC = () => {
  const { unit, toggleUnit } = useWeather();

  return (
    <button onClick={toggleUnit} className={styles.toggleButton}>
      Switch to {unit === "celsius" ? "Fahrenheit" : "Celsius"}
    </button>
  );
};

export default UnitToggle;
