import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRenderer } from './button-renderer.component';

describe('ButtonRendererComponent', () => {
  let component: ButtonRenderer;
  let fixture: ComponentFixture<ButtonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
