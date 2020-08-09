import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelbuttonRenderer } from './cancelbutton-renderer.component';

describe('CancelbuttonRendererComponent', () => {
  let component: CancelbuttonRenderer;
  let fixture: ComponentFixture<CancelbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CancelbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
