import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [SearchPage],
  imports: [CommonModule, WeatherRoutingModule,SharedModule],
})
export class WeatherModule {}
