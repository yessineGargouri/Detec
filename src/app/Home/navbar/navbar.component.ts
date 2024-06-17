import { Component, HostListener, Renderer2, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private lastScrollTop = 0;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.rearrangeElements();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > this.lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
      } else {
        // Scrolling up
        navbar.classList.remove('hidden');
      }
      this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.rearrangeElements();
  }

  rearrangeElements(): void {
    const toggleMenu = document.querySelector('.toggle_menu');
    const atheme = document.getElementById('atheme');
    const alang = document.getElementById('alang');
    const navul = document.getElementById('navul');

    if (toggleMenu && window.getComputedStyle(toggleMenu).display !== 'none') {
      if (atheme && alang && navul) {
        // Clearing existing classes from atheme and alang
        this.renderer.setAttribute(atheme, 'class', '');
        this.renderer.setAttribute(alang, 'class', '');

        // Create new list items
        const liAtheme = this.renderer.createElement('li');
        const liAlang = this.renderer.createElement('li');

        // Append elements to the new list items
        this.renderer.appendChild(liAtheme, atheme);
        this.renderer.appendChild(liAlang, alang);

        // Append new list items to the navbar's ul
        this.renderer.appendChild(navul, liAtheme);
        this.renderer.appendChild(navul, liAlang);
      }
    } else {
      console.log('Toggle menu is not displayed, no rearrangement needed or handle differently.');
    }
  }

  toggleTheme() {
    // Get all elements with class 'ds' or 'ls'
    const dsElements = document.querySelectorAll('.ds');
    const lsElements = document.querySelectorAll('.ls');

    // Change 'ds' to 'ls'
    dsElements.forEach((element) => {
      this.renderer.removeClass(element, 'ds');
      this.renderer.addClass(element, 'ls');
    });

    // Change 'ls' to 'ds'
    lsElements.forEach((element) => {
      this.renderer.removeClass(element, 'ls');
      this.renderer.addClass(element, 'ds');
    });

    // Change the icon and images based on theme
    const icon = document.getElementById('toggle-icon') as HTMLImageElement;
    const logo = document.getElementById('detec') as HTMLImageElement;
    const banner1 = document.getElementById('banner1') as HTMLImageElement;
    const banner2 = document.getElementById('banner2') as HTMLImageElement;
    const banner3 = document.getElementById('banner3') as HTMLImageElement;
    const speciality = document.getElementById('speciality') as HTMLImageElement;
    const welcome = document.getElementById('welcome') as HTMLImageElement;
    const logof = document.getElementById('logof') as HTMLImageElement;
    const lang = document.getElementById('lang') as HTMLImageElement;

    if (icon) {
      if (icon.src.includes('sun.png')) {
        icon.src = './assets/images/moon.png';
        logo.src='./assets/images/LOGOR.svg';
        logof.src='./assets/images/LOGOR.svg';
        banner1.src='./assets/images/16.jpg';
        banner2.src='./assets/images/6.jpg';
        banner3.src='./assets/images/17.jpg';
        speciality.style.backgroundImage='url(./assets/images/18.png)';
        welcome.style.backgroundImage='url(./assets/images/5.webp)';
        lang.src='./assets/images/langb.png';
      } else {
        icon.src = './assets/images/sun.png';
        logo.src='./assets/images/LOGOW.svg';
        logof.src='./assets/images/LOGOW.svg';
        banner1.src='./assets/images/9.jpg';
        banner2.src='./assets/images/8.jpg';
        banner3.src='./assets/images/14.jpg';
        speciality.style.backgroundImage='url(./assets/images/6.webp)';
        welcome.style.backgroundImage='url(./assets/images/8.png)';
        lang.src='./assets/images/langw.png';
      }
    }
  }
}
