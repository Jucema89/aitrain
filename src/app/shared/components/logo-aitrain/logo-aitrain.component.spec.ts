import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAitrainComponent } from './logo-aitrain.component';

describe('LogoAitrainComponent', () => {
  let component: LogoAitrainComponent;
  let fixture: ComponentFixture<LogoAitrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoAitrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoAitrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
