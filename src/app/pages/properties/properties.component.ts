import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PropertiesService } from '../../core/services/properties.service';
import { Cities } from '../../shared/interfaces/cities';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import {
  PropertyFilter,
  SortBy,
} from '../../shared/interfaces/property-filter';
import { MultiSelectModule } from 'primeng/multiselect';
import { propertyDetails } from '../../shared/interfaces/property-details';
import { PaginatorModule } from 'primeng/paginator';
import { AccordionModule } from 'primeng/accordion';
import { DrawerModule } from 'primeng/drawer';
import { DatePipe } from '@angular/common';
import * as L from 'leaflet';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-properties',
  imports: [
    SelectModule,
    FormsModule,
    ButtonModule,
    AccordionModule,
    FloatLabelModule,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule,
    DrawerModule,
    DatePipe,
    DialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  filters: PropertyFilter = {
    page: 1,
    identifier: '',

    property_type: '',
  } as PropertyFilter;
  selectedCity = signal({} as Cities);
  selectedBedroom: string = '';
  selectedPropertyType: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  cities: Cities[] = [];
  showNumber = false;
  properties: WritableSignal<propertyDetails[] | null> = signal(null);
  propertyFilter: PropertyFilter | null = null;
  totalRecords = 0;
  first = 0;
  rows = 20;

  asideVisible = false;

  modalVisible = false;
  modalProperty: propertyDetails | null = null;
  map!: L.Map;
  spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  bedrooms: string[] = ['1', '2', '3', '4', '5', '6', '7', '7+'];
  bathrooms: string[] = ['1', '2', '3', '4', '5', '6', '7', '7+'];
  propertyTypes: string[] = [
    'Detached',
    'SemiDetached',
    'Terraced',
    'Flat',
    'Bungalow',
    'Land',
    'ParkHome',
  ];
  sortOptions = [
    { label: 'Highest Price', value: SortBy.HighestPrice },
    { label: 'Lowest Price', value: SortBy.LowestPrice },
    { label: 'Newest Listed', value: SortBy.NewestListed },
    { label: 'Oldest Listed', value: SortBy.OldestListed },
    { label: 'Nearest First', value: SortBy.NearestFirst },
  ];
  activeModal: string | null = null;
  shownNumbers: { [propertyId: string]: boolean } = {};

  sortBy: any;
  isModalVisible = false;
  isModalPriceVisible = false;
  constructor(
    public _service: PropertiesService,
    private eRef: ElementRef,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.cities = this._service.CITIES;

    this.selectedCity.set(this.cities[2]);

    this.filters.identifier = this.selectedCity().code;
    this.filters.page = 1;
    this.first = 0;
    this.getProperties();
  }

  onSelectCity(city: Cities) {
    this.selectedCity.set(city);
    this.filters.identifier = city.code;
    this.setMap(this.selectedCity, this.properties());
  }
  onPropertyTypeChange(e: any) {
    this.filters.property_type = e.toString();
  }
  resetAndGetProperties() {
    this.filters.page = 1;
    this.first = 0;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getProperties();
  }
  onPageChange(e: any) {
    this.filters.page = e.page + 1;
    this.rows = e.rows;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.getProperties();
    this.setMap(this.selectedCity, this.properties());
  }
  getProperties() {
    this.spinner.show();

    this._service.getNewForSale(this.filters).subscribe({
      next: (res) => {
        if (res.data) {
          const filterdData = res.data.filter(
            (p: propertyDetails) => !p.featuredProperty
          );
          this.properties.set(filterdData);

          const removedCount = res.data.length - filterdData.length;
          this.totalRecords = res.totalResultCount - removedCount;
          this.first = ((this.filters.page ?? 1) - 1) * this.rows;

          this.setMap(this.selectedCity, this.properties());
        } else {
          this.toast.error(res.message.error);
        }
        this.spinner.hide();
      },
      error: (err) => {
        console.error('Error fetching properties:', err);
        this.spinner.hide();
      },
    });
  }

  selectBedroom(bed: string) {
    this.selectedBedroom = bed;
    if (bed.includes('+'))
      this.filters.min_bedroom = Number(bed.replace('+', ''));
    else this.filters.max_bedroom = +bed;
    this.activeModal = null;
  }

  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  showModalPrice() {
    this.isModalPriceVisible = !this.isModalPriceVisible;
  }

  navigateToDetails(id: any) {
    this.router.navigate(['/propertyDetails', id], {
      queryParams: { region: this.filters.identifier },
    });
  }
  toggleModal(modalName: string) {
    this.activeModal = this.activeModal === modalName ? null : modalName;
  }

  closeAllModals() {
    this.activeModal = null;
  }

  toggleNumber(propertyId: string | number) {
    this.shownNumbers[propertyId] = !this.shownNumbers[propertyId];
  }
  showDialog(prop: propertyDetails) {
    this.modalVisible = !this.modalVisible;
    this.modalProperty = prop;
  }

  setMap(city: WritableSignal<Cities>, properties: propertyDetails[] | null) {
    if (this.map) {
      this.map.remove();
    }
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '../images/leaflet/images/marker-icon-2x.png',
      iconUrl: '../images/leaflet/images/marker-icon.png',
      shadowUrl: '../images/leaflet/images/marker-shadow.png',
    });
    this.map = L.map('map').setView(city().location as [number, number], 10);
    L.tileLayer(
      'https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=vL7hxmvsRToGOSwlYGsK',
      {
        maxZoom: 15,

        attribution:
          '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      }
    ).addTo(this.map);

    properties?.forEach((prop) => {
      const houseIcon = L.divIcon({
        html: `<img
  src="${prop.customer.brandPlusLogoUrl}"
  style="
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #fff;
  "
  alt="logo"
/>
`,
        className: 'circle-marker',

        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });
      let marker = L.marker([prop.location.latitude, prop.location.longitude], {
        icon: houseIcon,
      }).addTo(this.map);

      const popupContent = prop.displayAddress;

      marker.bindPopup(popupContent, {
        autoPan: false,
      });
      marker.on('click', () => {
        this.showDialog(prop);
      });

      marker.on('mouseover', function () {
        marker.openPopup();
      });

      marker.on('mouseout', function () {
        marker.closePopup();
      });
    });

    const circle = L.circle(city().location, {
      color: 'blue',
      fillColor: '#3a8ef5',
      fillOpacity: 0.25,
      radius: 15000,
    }).addTo(this.map);
  }
}
