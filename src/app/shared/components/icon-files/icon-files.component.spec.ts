import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFilesComponent } from './icon-files.component';

describe('IconFilesComponent', () => {
  let component: IconFilesComponent;
  let fixture: ComponentFixture<IconFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
