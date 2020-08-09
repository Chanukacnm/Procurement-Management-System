import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionpopupComponent } from './actionpopup.component';

describe('ActionpopupComponent', () => {
  let component: ActionpopupComponent;
  let fixture: ComponentFixture<ActionpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
