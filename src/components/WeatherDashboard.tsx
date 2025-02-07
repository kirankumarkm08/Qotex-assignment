import type React from "react";
import SearchInput from "./SearchInput";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";
import UnitToggle from "./UnitToggle";
import ErrorMessage from "./Errormessage";
import { useWeather } from "../Context/WeatherContext";

const WeatherDashboard: React.FC = () => {
  const { isLoading, error } = useWeather();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorMessage />;

  return (
    <>
      <SearchInput />
      <UnitToggle />
      <CurrentWeather />
      <Forecast />
    </>
  );
};

export default WeatherDashboard;
