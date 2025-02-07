"use client";

import type React from "react";
import {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import { useQuery } from "@tanstack/react-query";

interface WeatherData {
  windSpeed: any;
  humidity: ReactNode;
  temperature: any;
  icon: string;
  condition: string | undefined;
  city: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    icon: string;
  };
  forecast: {
    date: string;
    temperature: number;
    condition: string;
    icon: string;
  }[];
}

interface WeatherContextType {
  weatherData: WeatherData | null;
  error: string | null;
  isLoading: boolean;
  fetchWeather: (city: string) => void;
  unit: "celsius" | "fahrenheit";
  toggleUnit: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = "d4e352ff83b8760e29c2f0495298b9bb";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const weatherResponse = await fetch(
    `${WEATHER_API_URL}?q=${city}&units=metric&appid=${API_KEY}`
  );
  const forecastResponse = await fetch(
    `${FORECAST_API_URL}?q=${city}&units=metric&appid=${API_KEY}`
  );

  if (!weatherResponse.ok || !forecastResponse.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const weatherData = await weatherResponse.json();
  const forecastData = await forecastResponse.json();

  return {
    city: weatherData.name,
    current: {
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      condition: weatherData.weather[0].main,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
    },
    forecast: forecastData.list
      .filter((_: any, index: number) => index % 8 === 0)
      .slice(0, 5)
      .map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        temperature: item.main.temp,
        condition: item.weather[0].main,
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
      })),
  };
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [city, setCity] = useState<string>(
    () => localStorage.getItem("lastCity") || ""
  );
  const [unit, setUnit] = useState<"celsius" | "fahrenheit">("celsius");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherData(city),
    enabled: !!city,
    refetchInterval: 30000,
    staleTime: 30000,
  });

  const fetchWeather = useCallback(
    (newCity: string) => {
      setCity(newCity);
      localStorage.setItem("lastCity", newCity);
      refetch();
    },
    [refetch]
  );

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "celsius" ? "fahrenheit" : "celsius"));
  }, []);

  const contextValue: WeatherContextType = {
    weatherData: data || null,
    error: error instanceof Error ? error.message : null,
    isLoading,
    fetchWeather,
    unit,
    toggleUnit,
  };

  return (
    <WeatherContext.Provider value={contextValue}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
