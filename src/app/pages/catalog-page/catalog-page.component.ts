import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent {

  

  constructor(private router: Router) { }

  navigateToAnotherPlace() {
    this.router.navigate(['/products']);
  }

}
