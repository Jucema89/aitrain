import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordComponent } from './input-password.component';

describe('InputComponent', () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InputPasswordComponent]
    });
    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
