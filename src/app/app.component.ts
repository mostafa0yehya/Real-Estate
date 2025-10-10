import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import AOS from 'aos';
import { NavbarComponent } from './layout/navbar/navbar.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'RealEstate_Project';
  ngOnInit() {
    AOS.init({ once: true, duration: 1100 }); // Optional: Pass config like AOS.init({ duration: 1000, once: true });
  }
}
