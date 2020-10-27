import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityCategoryTableComponent } from './amenity-category-table.component';

describe('AmenityCategoryTableComponent', () => {
  let component: AmenityCategoryTableComponent;
  let fixture: ComponentFixture<AmenityCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmenityCategoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
