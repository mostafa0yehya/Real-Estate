import { animation } from '@angular/animations';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-prices',
  imports: [ChartModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
})
export class PricesComponent {
  basicData: any;
  basicOptions: any;

  ngOnInit() {
    this.basicData = {
      labels: [
        'London',
        'Manchester',
        'Birmingham',
        'Leeds',
        'Brighton',
        'Bristol',
      ],

      datasets: [
        {
          label: 'Average Property Price (£)',
          data: [620000, 300000, 280000, 350000, 420000, 400000],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ],
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      ],
    };

    this.basicOptions = {
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
      },
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
        title: {
          display: true,
          text: 'Average Property Price by Region',
          color: '#374151',
          font: { size: 18 },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#6b7280',
          },
          grid: {
            color: '#e5e7eb',
          },
        },
        y: {
          ticks: {
            color: '#6b7280',
            callback: function (value: any) {
              return '£' + value / 1000 + 'k';
            },
            beginAtZero: true,
          },
          grid: {
            color: '#e5e7eb',
          },
        },
      },
    };
  }
}
