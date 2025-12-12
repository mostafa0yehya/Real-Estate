import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-compare',
  imports: [CurrencyPipe],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css',
})
export class CompareComponent implements OnInit {
  ngOnInit(): void {
    const propertiesList = localStorage.getItem('properties');

    if (propertiesList) {
      const parsedList = JSON.parse(propertiesList);
      this.propertiesService.PropertiesCompareList.set(parsedList);
    }
  }
  propertiesService = inject(PropertiesService);
  properties = computed(() => this.propertiesService.PropertiesCompareList());
}
