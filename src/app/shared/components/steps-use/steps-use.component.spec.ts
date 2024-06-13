import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsUseComponent } from './steps-use.component';

describe('StepsUseComponent', () => {
  let component: StepsUseComponent;
  let fixture: ComponentFixture<StepsUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepsUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
