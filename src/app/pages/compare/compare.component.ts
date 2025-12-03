import { Component, computed, inject, Signal } from '@angular/core';
import { PropertiesService } from '../../core/services/properties.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-compare',
  imports: [CurrencyPipe],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css',
})
export class CompareComponent {
  propertiesService = inject(PropertiesService);
  properties = computed(() => this.propertiesService.PropertiesCompareList());
}
