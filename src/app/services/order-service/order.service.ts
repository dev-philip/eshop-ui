import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = environment.apiUrlForEshopApp; 
  // private baseUrl = environment.apiUrlForAdmin; 

  constructor(
    private http: HttpClient, 
    ) {

   }

  saveOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/order`, 
      order
    );
  }
}
