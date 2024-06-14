import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrainDocsComponent } from './form-train-docs.component';

describe('FormTrainDocsComponent', () => {
  let component: FormTrainDocsComponent;
  let fixture: ComponentFixture<FormTrainDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTrainDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTrainDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
