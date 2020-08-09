import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachbuttonRenderer } from './attachbutton-renderer.component';

describe('AttachbuttonRendererComponent', () => {
  let component: AttachbuttonRenderer;
  let fixture: ComponentFixture<AttachbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AttachbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
