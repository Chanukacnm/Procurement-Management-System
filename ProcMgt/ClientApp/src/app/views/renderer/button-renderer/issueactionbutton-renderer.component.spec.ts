import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueactionbuttonRenderer } from './issueactionbutton-renderer.component';

describe('IssueactionbuttonRenderer', () => {
  let component: IssueactionbuttonRenderer;
  let fixture: ComponentFixture<IssueactionbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueactionbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueactionbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
