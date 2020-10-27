import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeCategoryTableComponent } from './property-type-category-table.component';

describe('PropertyTypeCategoryTableComponent', () => {
  let component: PropertyTypeCategoryTableComponent;
  let fixture: ComponentFixture<PropertyTypeCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
