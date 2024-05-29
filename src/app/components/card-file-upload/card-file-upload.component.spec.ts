import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFileUploadComponent } from './card-file-upload.component';

describe('CardFileUploadComponent', () => {
  let component: CardFileUploadComponent;
  let fixture: ComponentFixture<CardFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFileUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
