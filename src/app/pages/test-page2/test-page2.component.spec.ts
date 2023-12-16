import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPage2Component } from './test-page2.component';

describe('TestPage2Component', () => {
  let component: TestPage2Component;
  let fixture: ComponentFixture<TestPage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPage2Component]
    });
    fixture = TestBed.createComponent(TestPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
