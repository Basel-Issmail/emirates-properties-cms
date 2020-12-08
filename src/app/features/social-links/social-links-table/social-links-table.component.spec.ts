import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinksTableComponent } from './social-links-table.component';

describe('SocialLinksTableComponent', () => {
  let component: SocialLinksTableComponent;
  let fixture: ComponentFixture<SocialLinksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialLinksTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLinksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
