import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemModalComponent } from './view-item-modal.component';

describe('ViewItemModalComponent', () => {
  let component: ViewItemModalComponent;
  let fixture: ComponentFixture<ViewItemModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewItemModalComponent]
    });
    fixture = TestBed.createComponent(ViewItemModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
