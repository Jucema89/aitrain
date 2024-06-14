import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingAIComponent } from './create-training-ai.component';

describe('CreateTrainingComponent', () => {
  let component: CreateTrainingAIComponent;
  let fixture: ComponentFixture<CreateTrainingAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrainingAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
