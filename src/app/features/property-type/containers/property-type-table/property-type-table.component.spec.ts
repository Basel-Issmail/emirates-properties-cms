import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeTableComponent } from './property-type-table.component';

describe('PropertyTypeTableComponent', () => {
  let component: PropertyTypeTableComponent;
  let fixture: ComponentFixture<PropertyTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
