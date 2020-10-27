import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLoadingComponent } from './grid-loading.component';

describe('GridLoadingComponent', () => {
  let component: GridLoadingComponent;
  let fixture: ComponentFixture<GridLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
