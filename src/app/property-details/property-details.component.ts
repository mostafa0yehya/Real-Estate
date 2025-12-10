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
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: PropertiesService
  ) {}

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
  initSwiper() {
    if (this.swiperRef) {
      Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
      this.swiperRef.nativeElement.initialize();
    }
  }
  showDialog() {
    this.galleryVisible = !this.galleryVisible;
  }
  propertyDetails = signal<PropertyMoreDetails | null>(null);
  similarProperties = signal<propertyDetails[] | null>(null);
  region: string = '';
  ngOnInit(): void {
    this.spinner.show();
    this._service.getProperty(this.productId()).subscribe({
      next: (res) => {
        this.propertyDetails.set(res.data);

        this.setMap();
        this.spinner.hide();
      },
    });
    this._activatedRoute.queryParams.subscribe((params) => {
      this.region = params['region'];
    });
    this.getSimilarProperties();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && changes['productId'].currentValue) {
      this._service.getProperty(this.productId()).subscribe({
        next: (res) => {
          this.propertyDetails.set(res.data);

          this.setMap();
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
  isExpanded = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  map!: L.Map;
  setMap() {
    if (this.map) {
      this.map.remove();
    }
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
  filter: PropertyFilter = {} as PropertyFilter;
  getSimilarProperties() {
    this.filter = {
      identifier: this.region,
      property_type: this.propertyDetails()?.tenure.tenureType,
    };
    this._service.getNewForSale(this.filter).subscribe({
      next: (res) => {
        this.similarProperties.set([...res.data]);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
