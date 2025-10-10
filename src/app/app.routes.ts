import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SideComponent } from './side/side.component';
import { PropertiesComponent } from './pages/properties/properties.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'side', component: SideComponent },
  { path: 'properties', component: PropertiesComponent },
  { path: '**', component: HomeComponent, title: 'Home' },
];
