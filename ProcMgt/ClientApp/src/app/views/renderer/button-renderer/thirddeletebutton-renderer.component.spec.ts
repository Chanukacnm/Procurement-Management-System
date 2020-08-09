import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirddeletebuttonRenderer } from './thirddeletebutton-renderer.component';

describe('ThirddeletebuttonRenderer', () => {
  let component: ThirddeletebuttonRenderer;
  let fixture: ComponentFixture<ThirddeletebuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThirddeletebuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirddeletebuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
