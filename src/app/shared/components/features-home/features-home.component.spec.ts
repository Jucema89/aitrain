import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesHomeComponent } from './features-home.component';

describe('FeaturesHomeComponent', () => {
  let component: FeaturesHomeComponent;
  let fixture: ComponentFixture<FeaturesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeaturesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
