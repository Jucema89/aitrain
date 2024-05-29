import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSelectMultipleComponent } from './select-multiple-choice.component';

describe('AppSelectMultipleComponent', () => {
  let component: AppSelectMultipleComponent;
  let fixture: ComponentFixture<AppSelectMultipleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppSelectMultipleComponent]
    });
    fixture = TestBed.createComponent(AppSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
