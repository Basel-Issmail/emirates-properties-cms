import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsFormComponent } from './agents-form.component';

describe('AgentsFormComponent', () => {
  let component: AgentsFormComponent;
  let fixture: ComponentFixture<AgentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
