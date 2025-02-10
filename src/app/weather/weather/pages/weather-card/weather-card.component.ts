import { Component, Input } from '@angular/core';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss'
})
export class WeatherCard {
  @Input('weather') weather: CurrentWeather

  showFahrenheit: boolean;
  constructor( private weatherService: WeatherService
  ) {
    this.weatherService.temperatureUnitChanged.subscribe((data) => {
      this.showFahrenheit = data;
    });

    this.weatherService.temperatureUnitChanged.subscribe((data) => {
      this.showFahrenheit = data;
    });

  }

  getWeatherIconUrl(): string {
    if (this.weather.WeatherIcon != null) {
      return `https://developer.accuweather.com/sites/default/files/${this.weather.WeatherIcon.toString().padStart(2, '0')}-s.png`;
    }
  }
}
