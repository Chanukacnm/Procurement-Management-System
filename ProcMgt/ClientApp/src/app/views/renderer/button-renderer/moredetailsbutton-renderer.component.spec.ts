import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoredetailsbuttonRenderer } from './moredetailsbutton-renderer.component';

describe('MoredetailsbuttonRendererComponent', () => {
  let component: MoredetailsbuttonRenderer;
  let fixture: ComponentFixture<MoredetailsbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoredetailsbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoredetailsbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
