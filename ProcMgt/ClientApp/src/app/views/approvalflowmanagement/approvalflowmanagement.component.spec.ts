import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalflowmanagementComponent } from './approvalflowmanagement.component';

describe('ApprovalflowmanagementComponent', () => {
  let component: ApprovalflowmanagementComponent;
  let fixture: ComponentFixture<ApprovalflowmanagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalflowmanagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalflowmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
