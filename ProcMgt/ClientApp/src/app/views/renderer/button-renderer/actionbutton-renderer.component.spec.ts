import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionbuttonRenderer } from './actionbutton-renderer.component';

describe('ActionbuttonRenderer', () => {
  let component: ActionbuttonRenderer;
  let fixture: ComponentFixture<ActionbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
