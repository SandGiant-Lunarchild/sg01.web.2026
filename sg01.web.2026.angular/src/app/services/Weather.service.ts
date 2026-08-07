import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { environment } from "../../environments/environment";
import { lastValueFrom } from 'rxjs'

export interface WeatherForecast {
  date: Date,
  temperatureC: number,
  temperatureF: number,
  summary: string | undefined
};

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  requestForecast() {
    return this.http.get<WeatherForecast[]>(`${environment.apiBase}/weatherforecast`);
  }

}

