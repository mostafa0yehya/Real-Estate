import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { PropertiesService } from '../../core/services/properties.service';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { TabsModule } from 'primeng/tabs';
import { Cities } from '../../shared/interfaces/cities';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AvatarModule } from 'primeng/avatar';
import { propertyDetails } from '../../shared/interfaces/property-details';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import { DatePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Router, RouterLink } from '@angular/router';
import { CountUpModule } from 'ngx-countup';
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-home',
  imports: [
    TabsModule,
    ProgressSpinnerModule,
    AvatarModule,
    DatePipe,
    TooltipModule,
    RouterLink,
    CountUpModule,
    AccordionModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  constructor(public service: PropertiesService) {}
  params: PropertyFilter | null = null;
  filters: PropertyFilter = {} as PropertyFilter;
  properties: propertyDetails[] | null = null;

  cities: Cities[] = [];
  currentCity: Cities = {} as Cities;
  shownNumbers: { [propertyId: string]: boolean } = {};

  toggleNumber(propertyId: string | number) {
    this.shownNumbers[propertyId] = !this.shownNumbers[propertyId];
  }
  countupOptions = {
    duration: 3,
    enableScrollSpy: true,
    scrollSpyOnce: true,
    useGrouping: true,
  };
  ngOnInit(): void {
    this.cities = this.service.CITIES;
    this.currentCity = this.cities[0];
    this.params = {
      identifier: 'REGION^1231',
    };
    this.filters = {
      identifier: 'REGION^1195',
    };
    this.service
      .getNewForSale({ identifier: this.currentCity.code })
      .subscribe({
        next: (res) => {
          this.currentCity.data = res.data.slice(0, 6);
        },
        error: (err) => console.error(err),
      });
    this.getProperties();
  }
  activeTab: string | number = 0;
  onTabChange(event: any) {
    const index = Number(event);
    this.activeTab = index;
    this.currentCity = this.cities[index];
    if (this.currentCity && !this.currentCity.data) {
      this.service
        .getNewForSale({ identifier: this.currentCity.code })
        .subscribe({
          next: (res) => {
            this.currentCity.data = res.data.slice(0, 6);
          },
          error: (err) => console.error(err),
        });
    }
  }
  getProperties() {
    this.service.getNewForSale(this.filters).subscribe({
      next: (res) => {
        this.properties = res.data.slice(10, 20);
        console.log(this.properties);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  private router = inject(Router);
  navigateToDetails(id: any) {
    this.router.navigate(['/propertyDetails', id]);
  }
  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;
  swiperConfig: SwiperOptions = {
    slidesPerView: 3,
    spaceBetween: 20,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },

    pagination: { clickable: true },
    keyboard: {
      enabled: true,
    },
  };
  ngAfterViewInit() {
    Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
    this.swiperRef.nativeElement.initialize();
  }
}
