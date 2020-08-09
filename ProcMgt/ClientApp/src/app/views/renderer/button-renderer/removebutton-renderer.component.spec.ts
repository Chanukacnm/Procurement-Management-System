import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovebuttonRenderer } from './removebutton-renderer.component';

describe('RemovebuttonRendererComponent', () => {
  let component: RemovebuttonRenderer;
  let fixture: ComponentFixture<RemovebuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovebuttonRenderer]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovebuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
