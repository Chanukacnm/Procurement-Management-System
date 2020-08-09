import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoapprovalpopupRendererComponent } from './poapprovalpopup-renderer.component';

describe('PoapprovalpopupRendererComponent', () => {
  let component: PoapprovalpopupRendererComponent;
  let fixture: ComponentFixture<PoapprovalpopupRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoapprovalpopupRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoapprovalpopupRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
