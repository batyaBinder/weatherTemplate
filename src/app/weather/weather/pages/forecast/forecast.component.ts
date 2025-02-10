import { Component, Input } from '@angular/core';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { SharedModule } from 'src/app/shared/shared.module';
import { DailyForecastComponent} from '../daily-forecast/daily-forecast.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [ SharedModule,DailyForecastComponent],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent {
  @Input() forecastData!: Forecast;
  isDarkMode:boolean;
constructor() {
  
}
}
