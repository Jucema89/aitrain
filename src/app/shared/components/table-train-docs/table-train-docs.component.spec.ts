import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTrainDocsComponent } from './table-train-docs.component';

describe('TableTrainDocsComponent', () => {
  let component: TableTrainDocsComponent;
  let fixture: ComponentFixture<TableTrainDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTrainDocsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTrainDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
