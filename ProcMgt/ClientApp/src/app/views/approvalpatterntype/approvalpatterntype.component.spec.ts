import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalpatterntypeComponent } from './approvalpatterntype.component';

describe('ApprovalpatterntypeComponent', () => {
  let component: ApprovalpatterntypeComponent;
  let fixture: ComponentFixture<ApprovalpatterntypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalpatterntypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalpatterntypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
