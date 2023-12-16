import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchInput = new BehaviorSubject<string>('');

  setSearchInput(input: string) {
    this.searchInput.next(input); // Update the BehaviorSubject's value
  }

  getSearchInput(): Observable<string> {
    return this.searchInput.asObservable();
  }

  constructor() { }
}
