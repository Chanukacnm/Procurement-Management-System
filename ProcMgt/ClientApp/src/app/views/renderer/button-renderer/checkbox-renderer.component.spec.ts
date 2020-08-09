import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxRenderer } from './checkbox-renderer.component';

describe('CheckboxRendererComponent', () => {
  let component: CheckboxRenderer;
  let fixture: ComponentFixture<CheckboxRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
