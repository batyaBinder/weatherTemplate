import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
  
})
export class LocationService {
  constructor(private httpClient: HttpClient,
  ) {}

  async getAutocompleteLocation(searchText: string): Promise<Location[]> {
    let params: HttpParams = new HttpParams()
      .append('apikey', environment.apiKey)
      .append('q', searchText);
  
    try {
      return await firstValueFrom(this.httpClient.get<Location[]>('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params }));
    } catch (error) {
      console.error('Error fetching autocomplete locations:', error);
      //this.messageService.add({ severity: 'error', summary: 'Autocomplete Error', detail: 'Failed to fetch location suggestions.' });
      return []; // Return an empty array to prevent further errors
    }
  }
  

  getLocationByKey(locationKey: string): Observable<Location> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);

    return this.httpClient.get<Location>(`http://dataservice.accuweather.com/locations/v1/${locationKey}`, { params });
  }
}


