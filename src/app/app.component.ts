import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  displayLoading = false;
  temperatureInFahrenheit=true;
  isDarkMode:boolean=false;
  constructor(private loaderService: LoaderService,private cd:ChangeDetectorRef, private weatherService: WeatherService) {

    this.weatherService.temperatureUnitChanged.next(this.temperatureInFahrenheit)
  }

  ngOnInit() {
    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
    this.weatherService.isDarkMode.subscribe((isDarkMode) => {
      document.body.classList.toggle('dark-theme', isDarkMode);
      this.cd.detectChanges();

      this.cd.markForCheck();
    });
 
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;

    this.weatherService.temperatureUnitChanged.next(this.temperatureInFahrenheit);
  }
  toggleTheme()
  {
    this.isDarkMode=!this.isDarkMode;
    this.weatherService.isDarkMode.next(this.isDarkMode);
  }
} 

