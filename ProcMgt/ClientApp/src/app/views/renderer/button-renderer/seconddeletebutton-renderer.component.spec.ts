import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeconddeletebuttonRenderer } from './seconddeletebutton-renderer.component';

describe('SeconddeletebuttonRenderer', () => {
  let component: SeconddeletebuttonRenderer;
  let fixture: ComponentFixture<SeconddeletebuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeconddeletebuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeconddeletebuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
