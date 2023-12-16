import { TestBed } from '@angular/core/testing';

import { SignupModalService } from './signup-modal.service';

describe('SignupModalService', () => {
  let service: SignupModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignupModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
