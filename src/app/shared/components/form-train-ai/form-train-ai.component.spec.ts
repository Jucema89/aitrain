import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrainAIComponent } from './form-train-ai.component';

describe('FormTrainAIComponent', () => {
  let component: FormTrainAIComponent;
  let fixture: ComponentFixture<FormTrainAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrainAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTrainAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
