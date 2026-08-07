
import { Component, signal, input, inject, effect } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { environment } from '../../environments/environment'
import { AsyncPipe } from '@angular/common';
import MarkdownIt from 'markdown-it'
import { WeatherService, WeatherForecast } from '../services/Weather.service';
import { Observable } from 'rxjs';

@Component({
  template: `
    <p>Hello. The server is at {{ serverUri }} for {{ envName }}</p> <div [innerHTML]="parsedValue"></div>
    @if (forecast | async; as result)
    {
      @for (item of result; track item.date) {
        <p>{{item.date}}: {{item.summary}}</p>
      }
    }
    `,
  imports: [ AsyncPipe ]
})
export class TestPage {
  private route = inject(ActivatedRoute);
  protected testValue = environment.testValue;
  protected serverUri = environment.apiBase;
  protected envName = environment.name;
  protected weatherService = inject(WeatherService);
  protected forecast : Observable<WeatherForecast[]> | null = null;

  constructor() {
    effect(() => {
      this.forecast = this.weatherService.requestForecast();
    });
  }


  get parsedValue(): string {
    const md = new MarkdownIt();
    return md.render(this.testValue);
  }
};
