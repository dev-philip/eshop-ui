import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartModalService {

  constructor() { }

  private cartItemAddedSubject = new BehaviorSubject<void>(undefined);

  cartItemAdded$: Observable<void> = this.cartItemAddedSubject.asObservable();

  triggerCartItemAddedAnimation() {
    this.cartItemAddedSubject.next();
  }
}
