import { Routes } from '@angular/router';
import { SearchPage } from './weather/weather/pages/search/search.page';

export const routes: Routes = [
    {
      path: 'search',
      component: SearchPage,
    },
    { path: '', redirectTo: 'search', pathMatch: 'full' },
  ];
  
