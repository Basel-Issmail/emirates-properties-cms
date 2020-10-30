import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionStatusFormComponent } from './completion-status-form.component';

describe('CompletionStatusFormComponent', () => {
  let component: CompletionStatusFormComponent;
  let fixture: ComponentFixture<CompletionStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionStatusFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
