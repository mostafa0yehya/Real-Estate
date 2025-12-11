import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertiesService } from '../core/services/properties.service';
import { PropertyMoreDetails } from '../shared/interfaces/property-more-details';
import { LowerCasePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import { PropertyFilter } from '../shared/interfaces/property-filter';
import { propertyDetails } from '../shared/interfaces/property-details';
@Component({
  selector: 'app-property-details',
  imports: [LowerCasePipe, DialogModule, RouterLink],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {
  productId: InputSignal<string> = input<string>('');
  galleryVisible = false;
  spinner = inject(NgxSpinnerService);

  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;

  @ViewChild('similarRef') similarRef!: ElementRef<SwiperContainer>;
  swiperConfig: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true, type: 'fraction' },
    keyboard: {
      enabled: true,
    },
  };
  similarConfig: SwiperOptions = {
    pagination: { type: 'bullets' },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    keyboard: true,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };

  propertyDetails = signal<PropertyMoreDetails | null>(null);
  similarProperties = signal<propertyDetails[] | null>(null);
  region: string = '';
  isExpanded = false;
  map!: L.Map;
  filter: PropertyFilter = {} as PropertyFilter;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: PropertiesService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this._service.getProperty(this.productId()).subscribe({
      next: (res) => {
        this.propertyDetails.set(res.data);

        this.setMap();
        this.spinner.hide();
        this.getSimilarProperties();
      },
    });
    this._activatedRoute.queryParams.subscribe((params) => {
      this.region = params['region'];
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && changes['productId'].currentValue) {
      this.spinner.show();
      this._service.getProperty(this.productId()).subscribe({
        next: (res) => {
          console.log('callled');

          this.propertyDetails.set(res.data);
          this.spinner.hide();
          this.setMap();
          this.getSimilarProperties();
        },
      });
    }
  }
  ngAfterViewInit() {
    Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
    this.swiperRef.nativeElement.initialize();
    Object.assign(this.similarRef.nativeElement, this.similarConfig);

    this.similarRef.nativeElement.initialize();
  }
  initSwiper() {
    if (this.swiperRef) {
      Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
      this.swiperRef.nativeElement.initialize();
    }
  }
  showDialog() {
    this.galleryVisible = !this.galleryVisible;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  setMap() {
    if (this.map) {
      this.map.remove();
    }

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '../images/leaflet/images/marker-icon-2x.png',
      iconUrl: '../images/leaflet/images/marker-icon.png',
      shadowUrl: '../images/leaflet/images/marker-shadow.png',
    });
    this.map = L.map('propertyMap').setView(
      [
        this.propertyDetails()?.location.latitude ?? 0,
        this.propertyDetails()?.location.longitude ?? 0,
      ],
      this.propertyDetails()?.location.zoomLevel
    );
    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=vL7hxmvsRToGOSwlYGsK',
      {
        maxZoom: 15,

        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    ).addTo(this.map);
    L.circle(
      [
        this.propertyDetails()?.location.latitude ?? 0,
        this.propertyDetails()?.location.longitude ?? 0,
      ],
      {
        radius: this.propertyDetails()?.location.circleRadiusOnMap,
      }
    ).addTo(this.map);

    let marker = L.marker([
      this.propertyDetails()?.location.latitude ?? 0,
      this.propertyDetails()?.location.longitude ?? 0,
    ]).addTo(this.map);
  }
  getSimilarProperties() {
    this.filter = {
      identifier: this.region,
      max_price:
        Number(
          this.propertyDetails()?.prices.primaryPrice.replace(/[^0-9.]/g, '')
        ) + 200000,
      min_price:
        Number(
          this.propertyDetails()?.prices.primaryPrice.replace(/[^0-9.]/g, '')
        ) - 150000,
      min_bedroom: (this.propertyDetails()?.bedrooms ?? 1) - 2,
      max_bedroom: (this.propertyDetails()?.bedrooms ?? 1) + 10,
    };

    this._service.getNewForSale(this.filter).subscribe({
      next: (res: any) => {
        if (Array.isArray(res.data)) {
          const filtered = res.data.filter(
            (item: propertyDetails) =>
              item.id.toString() !== this.propertyDetails()?.id
          );
          this.similarProperties.set(filtered);
        }
      },
      error: (err) => {
        console.log(err);
        this.spinner.hide();
      },
    });
  }
}
