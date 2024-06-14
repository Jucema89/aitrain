import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsAIComponent } from './trainings-ai.component';

describe('TrainingsAIComponent', () => {
  let component: TrainingsAIComponent;
  let fixture: ComponentFixture<TrainingsAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingsAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingsAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
