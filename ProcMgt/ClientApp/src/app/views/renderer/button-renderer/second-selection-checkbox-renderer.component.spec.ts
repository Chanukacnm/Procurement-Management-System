import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondSelectionCheckboxRenderer } from './second-selection-checkbox-renderer.component';

describe('SecondSelectionCheckboxRendererComponent', () => {
  let component: SecondSelectionCheckboxRenderer;
  let fixture: ComponentFixture<SecondSelectionCheckboxRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondSelectionCheckboxRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondSelectionCheckboxRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
