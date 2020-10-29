import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeCategoryFormComponent } from './property-type-category-form.component';

describe('PropertyTypeCategoryFormComponent', () => {
  let component: PropertyTypeCategoryFormComponent;
  let fixture: ComponentFixture<PropertyTypeCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
