import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityCategoryFormComponent } from './amenity-category-form.component';

describe('AmenityCategoryFormComponent', () => {
  let component: AmenityCategoryFormComponent;
  let fixture: ComponentFixture<AmenityCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmenityCategoryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
