import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondeditbuttonRenderer } from './secondeditbutton-renderer.component';

describe('SecondeditbuttonRenderer', () => {
  let component: SecondeditbuttonRenderer;
  let fixture: ComponentFixture<SecondeditbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondeditbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondeditbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
