import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  InputSignal,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../core/services/properties.service';
import { PropertyMoreDetails } from '../shared/interfaces/property-more-details';
import { LowerCasePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SwiperContainer } from 'swiper/element';
import { SwiperOptions } from 'swiper/types';
import L from 'leaflet';

@Component({
  selector: 'app-property-details',
  imports: [LowerCasePipe, DialogModule],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertyDetailsComponent implements OnInit, AfterViewInit {
  ngAfterViewInit() {
    Object.assign(this.swiperRef.nativeElement, this.swiperConfig);
    this.swiperRef.nativeElement.initialize();
  }
  productId: InputSignal<string> = input<string>('');
  galleryVisible = false;

  @ViewChild('swiperRef') swiperRef!: ElementRef<SwiperContainer>;
  swiperConfig: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true, type: 'fraction' },
    keyboard: {
      enabled: true,
    },
  };
  showDialog() {
    this.galleryVisible = !this.galleryVisible;
  }
  propertyDetails = signal<PropertyMoreDetails | null>(null);
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _service: PropertiesService
  ) {}
  ngOnInit(): void {
    this._service.getProperty(this.productId()).subscribe({
      next: (res) => {
        this.propertyDetails.set(res.data);
        this.setMap();
      },
    });
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
}
