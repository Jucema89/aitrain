import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsDocsComponent } from './trainings-docs.component';

describe('TrainingsDocsComponent', () => {
  let component: TrainingsDocsComponent;
  let fixture: ComponentFixture<TrainingsDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingsDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingsDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
