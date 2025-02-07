import type React from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/Loadingindicator.module.css";

const LoadingIndicator: React.FC = () => {
  const { isLoading } = useWeather();

  if (!isLoading) return null;

  return <div className={styles.loader}>Loading...</div>;
};

export default LoadingIndicator;
