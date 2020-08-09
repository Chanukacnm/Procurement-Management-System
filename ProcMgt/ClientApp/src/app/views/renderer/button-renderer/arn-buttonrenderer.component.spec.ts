import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnButtonrenderer } from './arn-buttonrenderer.component';

describe('ArnButtonrendererComponent', () => {
  let component: ArnButtonrenderer;
  let fixture: ComponentFixture<ArnButtonrenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArnButtonrenderer]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArnButtonrenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
