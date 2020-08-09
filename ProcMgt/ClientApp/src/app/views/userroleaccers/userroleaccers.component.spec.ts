import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleaccersComponent } from './userroleaccers.component';

describe('UserroleaccersComponent', () => {
  let component: UserroleaccersComponent;
  let fixture: ComponentFixture<UserroleaccersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleaccersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleaccersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
