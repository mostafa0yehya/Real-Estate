import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
    if (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.checked = true;
      document.documentElement.classList.toggle('dark');
    }
  }
  isScroll = false;
  checked = false;
  @HostListener('window:scroll') onScroll() {
    scrollY > 0 ? (this.isScroll = true) : (this.isScroll = false);
  }
  toggle(e: any) {
    if (this.checked) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
    document.documentElement.classList.toggle(
      'dark',
      localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  }
}
