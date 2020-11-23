import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPasswordFormComponent } from './agent-password-form.component';

describe('AgentPasswordFormComponent', () => {
  let component: AgentPasswordFormComponent;
  let fixture: ComponentFixture<AgentPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentPasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
