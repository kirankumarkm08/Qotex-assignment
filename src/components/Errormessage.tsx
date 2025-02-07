import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  const { error } = useWeather();

  if (!error) return null;

  return <div className={styles.error}>{error}</div>;
};

export default ErrorMessage;
