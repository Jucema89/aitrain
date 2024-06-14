import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTrainingDocsComponent } from './create-training-docs.component';

describe('CreateTrainingComponent', () => {
  let component: CreateTrainingDocsComponent;
  let fixture: ComponentFixture<CreateTrainingDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTrainingDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTrainingDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
