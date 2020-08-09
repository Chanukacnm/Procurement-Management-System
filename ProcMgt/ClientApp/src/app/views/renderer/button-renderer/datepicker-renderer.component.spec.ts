import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRenderer } from './datepicker-renderer.component';

describe('DatepickerRendererComponent', () => {
  let component: DatepickerRenderer;
  let fixture: ComponentFixture<DatepickerRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
