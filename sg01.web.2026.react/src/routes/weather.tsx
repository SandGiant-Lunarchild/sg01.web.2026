import { createFileRoute } from '@tanstack/react-router'
import { fetchWeather, type WeatherForecast } from "../services/WeatherService"

export const Route = createFileRoute('/weather')({
    component: Weather,
});

function ForecastRow({ forecast }: { forecast: WeatherForecast }) {
    return (
        <tr key={forecast.date.toISOString()}>
            <th>{forecast.date.toLocaleDateString()}</th>
            <td>{forecast.summary}</td>
        </tr>
    );
}

function Weather() {
  const forecast = fetchWeather();
  return (
    <div className="p-2">
      <h3>Weather Forecast</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecast.data?.map((f) => (
            <ForecastRow key={f.date.toISOString()} forecast={f} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
