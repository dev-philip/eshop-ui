import { Injectable } from '@angular/core';
import { Product } from '../../types/product-types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  // private products: Product[] = [
  //   { 
  //     id: 1,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Women Hot Collection", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: false,
  //     label: "",
  //     labelClass: "",
  //     category: "watch",
  //   },
  //   { 
  //     id: 2,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Awesome Pink Show", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: false,
  //     label: "",
  //     labelClass: "",
  //     category: "watch",
  //   },
  //   { 
  //     id: 3,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Awesome Bags Collection", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: false,
  //     label: "", 
  //     labelClass: "",
  //     category: "ladies",
  //   },
  //   { 
  //     id: 4,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Women Pant Collectons", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: true,
  //     label: "NEW", 
  //     labelClass: "new",
  //     category: "men",
  //   },
  //   { 
  //     id: 5,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Awesome Bags Collection", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: false,
  //     label: "",
  //     labelClass: "",
  //     category: "watch",
  //   },
  //   { 
  //     id: 6,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Awesome Cap For Women", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: true,
  //     label: "30% OFF",
  //     labelClass: "price-dec",
  //     category: "watch",
  //   },
  //   { 
  //     id: 7,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Polo Dress For Women", 
  //     productPrice: 29.00,
  //     currency: "USD",
  //     isDiscount: false,
  //     discountPrice: 0,
  //     isLabel: false,
  //     label: "", 
  //     labelClass: "",
  //     category: "watch",
  //   },
  //   { 
  //     id: 8,
  //     productLink: "product-details.html", 
  //     defaultImg: "https://via.placeholder.com/550x750",
  //     hoverImg: "https://via.placeholder.com/550x750",
  //     productName: "Black Sunglass For Women", 
  //     productPrice: 60.00,
  //     currency: "USD",
  //     isDiscount: true,
  //     discountPrice: 50.00,
  //     isLabel: true,
  //     label: "HOT",
  //     labelClass: "out-of-stock",
  //     category: "watch",
  //   },
  //   // Add more items here
  // ];

  private baseUrl = environment.apiUrlForEshopApp; 



  getProductsApi(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`);
  }

  getProductsByCategoryApi(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/products?categoryId=${id}`);
  }

  // getProducts(): Product[] {
  //   return this.products
  // }
}
