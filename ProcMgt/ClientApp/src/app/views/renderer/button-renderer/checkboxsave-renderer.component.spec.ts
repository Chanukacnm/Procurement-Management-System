import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxsaveRenderer } from './checkboxsave-renderer.component';

describe('CheckboxsaveRendererComponent', () => {
  let component: CheckboxsaveRenderer;
  let fixture: ComponentFixture<CheckboxsaveRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxsaveRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxsaveRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
