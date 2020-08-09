import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdselectioncheckboxRenderer } from './thirdselectioncheckbox-renderer.component';

describe('ThirdselectioncheckboxRenderer', () => {
  let component: ThirdselectioncheckboxRenderer;
  let fixture: ComponentFixture<ThirdselectioncheckboxRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdselectioncheckboxRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdselectioncheckboxRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
