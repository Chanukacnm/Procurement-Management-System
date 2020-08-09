import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnentryComponent } from './arnentry.component';

describe('ArnentryComponent', () => {
  let component: ArnentryComponent;
  let fixture: ComponentFixture<ArnentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArnentryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArnentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
