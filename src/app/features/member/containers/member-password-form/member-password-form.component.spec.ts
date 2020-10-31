import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPasswordFormComponent } from './member-password-form.component';

describe('MemberPasswordFormComponent', () => {
  let component: MemberPasswordFormComponent;
  let fixture: ComponentFixture<MemberPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPasswordFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
