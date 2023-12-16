import { TestBed } from '@angular/core/testing';

import { ViewItemModalService } from './view-item-modal.service';

describe('ViewItemModalService', () => {
  let service: ViewItemModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewItemModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
