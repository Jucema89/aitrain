import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextFeatureComponent } from './next-feature.component';

describe('NextFeatureComponent', () => {
  let component: NextFeatureComponent;
  let fixture: ComponentFixture<NextFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
