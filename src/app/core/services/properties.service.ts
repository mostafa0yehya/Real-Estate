import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, InputSignal, Signal, signal } from '@angular/core';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { Observable } from 'rxjs';
import { propertyDetails } from '../../shared/interfaces/property-details';
import { Cities } from '../../shared/interfaces/cities';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private baseUrl = 'https://uk-real-estate-rightmove.p.rapidapi.com';

  private headers = {
    'x-rapidapi-host': 'uk-real-estate-rightmove.p.rapidapi.com',
    'X-RapidAPI-Key': 'da1194aefamsh3b9fe767e162849p16ed93jsnbb890e47200a',
  };

  PropertiesCompareList = signal<propertyDetails[]>([]);
  constructor(private httpClient: HttpClient) {}
  getNewForSale(filter: PropertyFilter): Observable<any> {
    console.log(filter);

    let params = new HttpParams();
    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = (filter as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.httpClient.get(`${this.baseUrl}/buy/property-for-sale`, {
      params: params,
      headers: this.headers,
    });
  }
  getProperty(id: string): Observable<any> {
    console.log(id);

    return this.httpClient.get(
      `    https://uk-real-estate-rightmove.p.rapidapi.com/buy/property-for-sale/detail?id=${id}`,
      {
        headers: this.headers,
      }
    );
  }

  AddToCompare(property: propertyDetails) {
    this.PropertiesCompareList.update((arr) => [...arr, property]);
    console.log(this.PropertiesCompareList);
  }
  // CITIES = {
  //   Southampton: {
  //     name: 'Southampton',
  //     code: 'REGION^1231',
  //     location: [50.9097, -1.4044],
  //   },
  //   Birmingham: {
  //     name: 'Birmingham',
  //     code: 'REGION^162',
  //     location: [52.4862, -1.8904],
  //   },
  //   Manchester: {
  //     name: 'Manchester',
  //     code: 'REGION^904',
  //     location: [53.4808, -2.2426],
  //   },
  //   Liverpool: {
  //     name: 'Liverpool',
  //     code: 'REGION^813',
  //     location: [53.4084, -2.9916],
  //   },
  //   Sheffield: {
  //     name: 'Sheffield',
  //     code: 'REGION^1195',
  //     location: [53.3811, -1.4701],
  //   },
  //   London: {
  //     name: 'London',
  //     code: 'REGION^87490',
  //     location: [51.5074, -0.1278],
  //   },
  //   Leeds: {
  //     name: 'Leeds',
  //     code: 'REGION^787',
  //     location: [53.8008, -1.5491],
  //   },
  // };

  CITIES: Cities[] = [
    { name: 'Southampton', code: 'REGION^1231', location: [50.9097, -1.4044] },
    { name: 'Birmingham', code: 'REGION^162', location: [52.4862, -1.8904] },
    { name: 'Manchester', code: 'REGION^904', location: [53.4808, -2.2426] },
    { name: 'Liverpool', code: 'REGION^813', location: [53.4084, -2.9916] },
    { name: 'Sheffield', code: 'REGION^1195', location: [53.3811, -1.4701] },
    { name: 'London', code: 'REGION^87490', location: [51.5074, -0.1278] },
    { name: 'Leeds', code: 'REGION^787', location: [53.8008, -1.5491] },
  ];
}
