import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  @ViewChild('preloader', { static: false }) preloader!: ElementRef;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.fadeOutPreloader();
    }, 2000);
  }

  fadeOutPreloader() {
    if (this.preloader) {
      this.preloader.nativeElement.style.transition = 'opacity 0.5s';
      this.preloader.nativeElement.style.opacity = '0';
      setTimeout(() => {
        this.preloader.nativeElement.style.display = 'none';
      }, 500);
    }
  }

}
