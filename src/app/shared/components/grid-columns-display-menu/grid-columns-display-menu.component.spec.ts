import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridColumnsDisplayMenuComponent } from './grid-columns-display-menu.component';

describe('GridColumnsDisplayMenuComponent', () => {
  let component: GridColumnsDisplayMenuComponent;
  let fixture: ComponentFixture<GridColumnsDisplayMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridColumnsDisplayMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridColumnsDisplayMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
