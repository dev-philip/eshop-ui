import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrlForAdmin; 

  constructor(private http: HttpClient) { }

  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/category/all`);
  }
}
