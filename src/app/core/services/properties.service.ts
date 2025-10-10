import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private baseUrl = 'https://uk-real-estate-rightmove.p.rapidapi.com';

  private headers = {
    'x-rapidapi-host': 'uk-real-estate-rightmove.p.rapidapi.com',
    'X-RapidAPI-Key': '34910e2cb6mshf007bcf75776973p131a91jsn3dd185388d09',
  };

  constructor(private httpClient: HttpClient) {}
  getNewForSale(filter: PropertyFilter): Observable<any> {
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

  CITIES = [
    { name: 'Southampton', code: 'REGION^1231' },
    { name: 'Birmingham', code: 'REGION^162' },
    { name: 'Manchester', code: 'REGION^904' },
    { name: 'Liverpool', code: 'REGION^813' },
    { name: 'Sheffield', code: 'REGION^1195' },
    { name: 'London', code: 'REGION^87490' },
    { name: 'Leeds', code: 'REGION^787' },
  ];
}
