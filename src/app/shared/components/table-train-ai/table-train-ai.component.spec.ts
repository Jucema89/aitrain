import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTrainAIComponent } from './table-train-ai.component';

describe('TableTrainAIComponent', () => {
  let component: TableTrainAIComponent;
  let fixture: ComponentFixture<TableTrainAIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTrainAIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTrainAIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
