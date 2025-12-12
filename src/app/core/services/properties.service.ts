import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, InputSignal, Signal, signal } from '@angular/core';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { Observable, of, tap } from 'rxjs';
import { propertyDetails } from '../../shared/interfaces/property-details';
import { Cities } from '../../shared/interfaces/cities';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  private baseUrl = 'https://uk-real-estate-rightmove.p.rapidapi.com';

  private headers = {
    'x-rapidapi-host': 'uk-real-estate-rightmove.p.rapidapi.com',
    'X-RapidAPI-Key': '824791e2f7mshfb961e0b7feab9ep179f66jsn7d49e6408499',
  };

  PropertiesCompareList = signal<propertyDetails[]>([]);
  private cache: Record<string, any> = {};

  constructor(private httpClient: HttpClient, private toast: ToastrService) {}

  getNewForSale(filter: PropertyFilter): Observable<any> {
    const key = JSON.stringify(filter);
    console.log(filter);

    if (this.cache[key]) {
      return of(this.cache[key]);
    }

    let params = new HttpParams();

    if (filter) {
      Object.keys(filter).forEach((key) => {
        const value = (filter as any)[key];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      });
    }

    return this.httpClient
      .get(`${this.baseUrl}/buy/property-for-sale`, {
        params: params,
        headers: this.headers,
      })
      .pipe(
        tap((data) => {
          this.cache[key] = data;
        })
      );
  }

  getProperty(id: string): Observable<any> {
    return this.httpClient.get(
      `    https://uk-real-estate-rightmove.p.rapidapi.com/buy/property-for-sale/detail?id=${id}`,
      {
        headers: this.headers,
      }
    );
  }
  // getSimilarProperty(id: string): Observable<any> {
  //   return this.httpClient.get(
  //     `    https://uk-real-estate-rightmove.p.rapidapi.com/buy/similar-to-property/detail?id=${id}`,
  //     {
  //       headers: this.headers,
  //     }
  //   );
  // }

  AddToCompare(property: propertyDetails) {
    const exists = this.PropertiesCompareList().some(
      (p) => p.id === property.id
    );

    if (exists) {
      this.toast.error('This property is already in your comparison list.');
      return;
    }

    if (this.PropertiesCompareList().length >= 2) {
      this.toast.error('Only two properties can be added to the comparison.');
      return;
    }

    this.PropertiesCompareList.update((arr) => [...arr, property]);
    localStorage.setItem(
      'properties',
      JSON.stringify(this.PropertiesCompareList())
    );
    this.toast.success('Property added to your comparison list.');
  }

  RemoveFromCompare(propertyId: number) {
    this.PropertiesCompareList.update((list) =>
      list.filter((p) => p.id !== propertyId)
    );
    localStorage.setItem(
      'properties',
      JSON.stringify(this.PropertiesCompareList())
    );
    this.toast.success('Property removed from comparison.');
  }

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
