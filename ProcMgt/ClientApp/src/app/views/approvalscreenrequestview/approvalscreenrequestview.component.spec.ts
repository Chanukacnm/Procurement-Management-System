import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalscreenrequestviewComponent } from './approvalscreenrequestview.component';

describe('ApprovalscreenrequestviewComponent', () => {
  let component: ApprovalscreenrequestviewComponent;
  let fixture: ComponentFixture<ApprovalscreenrequestviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalscreenrequestviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalscreenrequestviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
