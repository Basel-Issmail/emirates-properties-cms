import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTabsComponent } from './grid-tabs.component';

describe('GridTabsComponent', () => {
  let component: GridTabsComponent;
  let fixture: ComponentFixture<GridTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
