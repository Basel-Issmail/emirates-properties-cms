import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionStatusTableComponent } from './completion-status-table.component';

describe('CompletionStatusTableComponent', () => {
  let component: CompletionStatusTableComponent;
  let fixture: ComponentFixture<CompletionStatusTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionStatusTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionStatusTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
