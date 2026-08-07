import { useQuery } from "@tanstack/react-query";
import { env } from "../env"
import { z } from "zod"

const WeatherForecastSchema = z.object({
    date: z.coerce.date(),
    temperatureC: z.float64(),
    temperatureF: z.float64(),
    summary: z.string().nullish()
});
export type WeatherForecast = z.infer<typeof WeatherForecastSchema>;

export function fetchWeather() {
    return useQuery({
        queryKey: ['weather-forecast'],
        queryFn: fetchWeatherInternal,
        staleTime: 10000,
        retryDelay: 1000
    });
}

async function fetchWeatherInternal() {
    try {
        const response = await fetch(`${env.VITE_APISERVER_URL}/weatherforecast`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const forecast = WeatherForecastSchema.array().parse(data);
        return forecast;
    }
    catch (error) {
        const errorMsg = error instanceof Error ? error.message : "There was an error";
        console.error("Failed to get weather forecast: %s", errorMsg);
        throw error;
    }
}
