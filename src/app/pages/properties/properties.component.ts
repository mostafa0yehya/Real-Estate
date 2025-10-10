import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PropertiesService } from '../../core/services/properties.service';
import { Cities } from '../../shared/interfaces/cities';
import { ButtonModule } from 'primeng/button';
import { NgClass } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PropertyFilter } from '../../shared/interfaces/property-filter';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-properties',
  imports: [
    SelectModule,
    FormsModule,
    ButtonModule,
    NgClass,
    FloatLabelModule,
    InputTextModule,
    MultiSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css',
})
export class PropertiesComponent implements OnInit {
  selectedCity: string = '';
  selectedBedroom: string | null = null;
  selectedBathroom: string | null = null;
  selectedPropertyType: string | null = null;
  minPrice = 0;
  maxPrice = 0;
  cities: Cities[] = [];
  showNumber = false;

  propertyFilter: PropertyFilter | null = null;
  constructor(private _service: PropertiesService, private eRef: ElementRef) {}
  ngOnInit(): void {
    this.cities = this._service.CITIES;
  }
  onFilterChange(e: any) {
    console.log(e);
  }

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

  selectBedroom(bed: string) {
    this.selectedBedroom = bed;
  }

  selectBathroom(bath: string) {
    this.selectedBathroom = bath;
  }
  isModalVisible = false;
  isModalPriceVisible = false;
  showModal() {
    this.isModalVisible = !this.isModalVisible;
  }
  showModalPrice() {
    this.isModalPriceVisible = !this.isModalPriceVisible;
  }
  //first step
  activeModal: string | null = null;
  //second
  toggleModal(modalName: string) {
    this.activeModal = this.activeModal === modalName ? null : modalName;
  }

  closeAllModals() {
    this.activeModal = null;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.bed-bath') && !target.closest('.price')) {
      this.activeModal = null;
    }
  }
  toggleNumber() {
    this.showNumber = !this.showNumber;
  }
}
