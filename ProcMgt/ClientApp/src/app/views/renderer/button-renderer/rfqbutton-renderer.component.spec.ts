import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqbuttonRenderer } from './rfqbutton-renderer.component';

describe('RfqbuttonRendererComponent', () => {
  let component: RfqbuttonRenderer;
  let fixture: ComponentFixture<RfqbuttonRenderer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RfqbuttonRenderer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqbuttonRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
