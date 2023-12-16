import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category-service/category-service.service';


interface Category {
  id: number;
  category_name: string;
  date_created: string;
  last_updated: string;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService
    ) { }

    ngOnInit() {
      this.categoryService.getCategory().subscribe(
        (response: Category[]) => {
          console.log(response);
          this.categories = response;
        },
        (error) => {
          console.error('Error logging In:', error);
          // Handle errors here
        }
      ).add(() => {
        
      });
    };

    lowerCase(text: string){
      const lowercaseText = text.toLowerCase();
      return lowercaseText;
    }
 


}
