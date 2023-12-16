import { TestBed } from '@angular/core/testing';

import { CartModalService } from './cart-modal.service';

describe('CartModalService', () => {
  let service: CartModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
