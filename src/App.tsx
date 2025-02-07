import type React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "./Context/WeatherContext";
import WeatherDashboard from "./components/WeatherDashboard";
import styles from "./assets/styles/App.module.css";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.app}>
        <div className={styles.content}>
          <h1 className={styles.title}>Weather Dashboard</h1>
          <WeatherProvider>
            <WeatherDashboard />
          </WeatherProvider>
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
