import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Location } from 'src/app/shared/models/location.model';
// import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { WeatherCard } from '../weather-card/weather-card.component';
import {  Forecast } from 'src/app/shared/models/forecast.model';
import { ForecastComponent } from '../forecast/forecast.component';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ADD_TO_FAVORITE, DEFAULT_CITY, REMOVE_TO_FAVORITE } from 'src/app/constants';

// @UntilDestroy({ checkProperties: true })

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
   providers: [MessageService], //
  imports: [AutoCompleteModule, SharedModule, CommonModule,MessageModule, WeatherCard, ForecastComponent]
})
export class SearchPage implements OnInit {

  city: Location;
  filterOptions: any[] = [];
  currentWeather: CurrentWeather;
  forecast: Forecast;
  isFillIcon: boolean = false
  favoriteTxt: string;
  error: boolean = false;


  constructor(private locationService: LocationService,
    private favoritesService: FavoritesService,
    private weatherService: WeatherService,
    private cd: ChangeDetectorRef,
    private messageService:MessageService
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.filterCities(DEFAULT_CITY);  
      if (this.filterOptions.length > 0) {
          this.city = this.filterOptions[0];
          this.onSelect();
  }
  }

  search(event) {
    this.filterCities(event.query);
  }

  AddRemoveFavoriteButton() {

    let favoriteCities = this.favoritesService.getFavorites();

    if (favoriteCities.findIndex(f => f.Key == this.city.Key) == (-1)) {
      this.isFillIcon = true;
      this.favoriteTxt = REMOVE_TO_FAVORITE;
    }
    else {
      this.isFillIcon = false;
      this.favoriteTxt = ADD_TO_FAVORITE;
    }
    this.cd.detectChanges();

  }
  onSelect() {
    if (!this.city) {
      return;
    }


    this.AddRemoveFavoriteButton();

    this.loadCurrentWeather();
    this.LoadForecast();
  }

  async filterCities(cityName) : Promise<void> {
    this.resetData();
    this.filterOptions = [];
    // const storedCities = localStorage.getItem('cities');

    // if (storedCities) {
    //   let cities = JSON.parse(storedCities); // Convert JSON string back to an array
    //   for (let i = 0; i < (cities).length; i++) {
    //     let city = cities[i];
    //     if (city.LocalizedName.toLowerCase().indexOf(cityName.toLowerCase()) == 0) {
    //       this.filterOptions.push(city);
        
    //     }
    //   }
    //   this.cd.detectChanges();


    // } 
    //else {

      this.filterOptions =await this.locationService.getAutocompleteLocation(cityName)
        
        localStorage.setItem('cities', JSON.stringify(this.filterOptions));
      
    //}
  }
  manageFavoriteList() {

    if (!this.city) {
      return;
    }
    let favoriteCities = this.favoritesService.getFavorites();

    if (favoriteCities.findIndex(f => f.Key == this.city.Key) == (-1)) {
      this.favoritesService.addToFavorites(this.city);
    }
    else {
      this.favoritesService.removeFromFavorites(this.city.Key);

    }
    this.AddRemoveFavoriteButton();
  }

  restrictToEnglish(event: KeyboardEvent) {
    this.resetData();
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }



  
  loadCurrentWeather() {
    // const currentWeatherStorage = localStorage.getItem('currentWeather');

    // if (currentWeatherStorage) {
    //   this.currentWeather = JSON.parse(currentWeatherStorage); // Convert JSON string back to an array
    //   this.cd.detectChanges();
    // }

    // else {
      this.weatherService.getCurrentWeather(this.city.Key).pipe(
        catchError(error => {
          this.showError("Failed to load current weather. Please try again.");
          return throwError(() => error);
        })
      ).subscribe((weather: CurrentWeather) => {
        this.currentWeather = weather[0];
        this.cd.detectChanges();
        localStorage.setItem('currentWeather', JSON.stringify(this.currentWeather));

      });

    //}
  }

  LoadForecast() {
    // const forecastStorage = localStorage.getItem('forecast');

    // if (forecastStorage) {
    //   this.forecast = JSON.parse(forecastStorage); // Convert JSON string back to an array
    //   this.cd.detectChanges();
    // }
    // else {
      this.weatherService.getForecast(this.city.Key).pipe(
        catchError(error => {
          this.showError("Failed to load forecast. Please try again.");
          return throwError(() => error);
        })
      ).subscribe((forecast: Forecast) => {
        this.forecast = forecast;
        this.cd.detectChanges();
        localStorage.setItem('forecast', JSON.stringify(this.forecast));
      });
    //}
  }
  
  resetData()
  {
    this.city=null;
    this.currentWeather=null;
    this.forecast=null;
    this.cd.detectChanges();

  }
  showError(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    this.cd.detectChanges();
  }  
}

