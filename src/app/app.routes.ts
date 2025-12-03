import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SideComponent } from './side/side.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { CompareComponent } from './pages/compare/compare.component';
import { PricesComponent } from './pages/prices/prices.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'side', component: SideComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'prices', component: PricesComponent },
  { path: 'propertyDetails/:productId', component: PropertyDetailsComponent },
  { path: '**', component: HomeComponent, title: 'Home' },
];
