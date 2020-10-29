import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeFormComponent } from './property-type-form.component';

describe('PropertyTypeFormComponent', () => {
  let component: PropertyTypeFormComponent;
  let fixture: ComponentFixture<PropertyTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
