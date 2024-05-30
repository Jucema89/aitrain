import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTrainComponent } from './table-train.component';

describe('TableTrainComponent', () => {
  let component: TableTrainComponent;
  let fixture: ComponentFixture<TableTrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTrainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
