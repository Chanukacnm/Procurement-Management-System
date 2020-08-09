import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisepobuttonRenderer } from './raisepobutton-renderer.component';

describe('RaisepobuttonRendererComponent', () => {
  let component: RaisepobuttonRenderer;
  let fixture: ComponentFixture<RaisepobuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaisepobuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisepobuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
