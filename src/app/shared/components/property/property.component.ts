import { Component, Input, input } from '@angular/core';
import { propertyDetails } from '../../interfaces/property-details';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-property',
  imports: [DatePipe],
  templateUrl: './property.component.html',
  styleUrl: './property.component.css',
})
export class PropertyComponent {
  @Input() prop: propertyDetails = {} as propertyDetails;
  showNumber = false;

  toggleNumber() {
    this.showNumber = !this.showNumber;
  }
}
