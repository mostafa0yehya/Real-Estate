import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { PropertiesService } from '../../core/services/properties.service';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { TabsModule } from 'primeng/tabs';
import { Cities } from '../../shared/interfaces/cities';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-home',
  imports: [TabsModule, ProgressSpinnerModule, AvatarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(private service: PropertiesService) {}
  params: PropertyFilter | null = null;
  cities: Cities[] = [
    { name: 'London', code: 'REGION^87490', data: null },
    { name: 'Manchester', code: 'REGION^904', data: null },
    { name: 'Liverpool', code: 'REGION^813', data: null },
    { name: 'Sheffield', code: 'REGION^1195', data: null },
    { name: 'Leeds', code: 'REGION^787', data: null },
    { name: 'Birmingham', code: 'REGION^162', data: null },
    { name: 'Southampton', code: 'REGION^1231', data: null },
  ];
  currentCity: Cities = this.cities[0];

  ngOnInit(): void {
    this.params = {
      identifier: 'REGION^1231',
    };
    // this.service.getNewForSale({ identifier: 'REGION^87490' }).subscribe({
    //   next: (res) => {
    //     this.currentCity.data = res.data.slice(0, 6);
    //   },
    //   error: (err) => console.error(err),
    // });
  }
  activeTab: string | number = 0;
  onTabChange(event: any) {
    const index = Number(event);
    this.activeTab = index;
    this.currentCity = this.cities[index];
    if (this.currentCity && !this.currentCity.data) {
      this.service;
      // .getNewForSale({ identifier: this.currentCity.code })
      // .subscribe({
      //   next: (res) => {
      //     this.currentCity.data = res.data.slice(0, 6);
      //   },
      //   error: (err) => console.error(err),
      // });
    }
  }
}
