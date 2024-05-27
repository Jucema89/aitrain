import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrainComponent } from './form-train.component';

describe('FormTrainComponent', () => {
  let component: FormTrainComponent;
  let fixture: ComponentFixture<FormTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
