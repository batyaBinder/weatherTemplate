import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { WeatherService } from 'src/app/core/services/weather.service';
import { DailyForecast } from 'src/app/shared/models/forecast.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-daily-forecast',
    standalone: true,
    imports: [ SharedModule],
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
})
export class DailyForecastComponent implements OnInit{

  @Input() forecast!: DailyForecast;
  showFahrenheit:boolean;
  constructor(private weatherService:WeatherService,
    private cd:ChangeDetectorRef
  ) {

    this.weatherService.temperatureUnitChanged.subscribe((data) => {

      this.showFahrenheit = data;

    });
  }
  async ngOnInit(): Promise<void> {
  }
  getWeatherIconUrl(): string {
    return `https://developer.accuweather.com/sites/default/files/${this.forecast.Day.Icon.toString().padStart(2, '0')}-s.png`;
  }

  celsiusToFahrenheit(celsius: number): number {
    return Math.round((celsius * 9/5) + 32);
  }

  // ממיר פרנהייט לצלזיוס
  fahrenheitToCelsius(fahrenheit): number {
    return Math.round((fahrenheit - 32) * 5/9);
  }
}
