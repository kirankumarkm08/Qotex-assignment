"use client";

import type React from "react";
import { useState } from "react";
import { useWeather } from "../Context/WeatherContext";
import styles from "../assets/styles/SearchInput.module.css";

const SearchInput: React.FC = () => {
  const [city, setCity] = useState("");
  const { fetchWeather, isLoading } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className={styles.input}
      />
      <button type="submit" disabled={isLoading} className={styles.button}>
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchInput;
