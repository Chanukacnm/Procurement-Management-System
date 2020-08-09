import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalscreenComponent } from './approvalscreen.component';

describe('ApprovalscreenComponent', () => {
  let component: ApprovalscreenComponent;
  let fixture: ComponentFixture<ApprovalscreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalscreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
