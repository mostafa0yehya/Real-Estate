import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FooterComponent } from './footer/footer.component';
import { ScrollTopModule } from 'primeng/scrolltop';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    NgxSpinnerModule,
    NgApexchartsModule,
    FooterComponent,
    ScrollTopModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'RealEstate_Project';

  ngOnInit() {
    AOS.init({ once: true, duration: 1100 });
  }
}
