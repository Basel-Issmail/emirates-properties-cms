import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityTableComponent } from './amenity-table.component';

describe('AmenityTableComponent', () => {
  let component: AmenityTableComponent;
  let fixture: ComponentFixture<AmenityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmenityTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmenityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
