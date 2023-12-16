import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDetailsPageComponent } from './cart-details-page.component';

describe('CartDetailsPageComponent', () => {
  let component: CartDetailsPageComponent;
  let fixture: ComponentFixture<CartDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartDetailsPageComponent]
    });
    fixture = TestBed.createComponent(CartDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
