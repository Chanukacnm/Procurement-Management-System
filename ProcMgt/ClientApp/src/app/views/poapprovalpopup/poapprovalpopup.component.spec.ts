import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoapprovalpopupComponent } from './poapprovalpopup.component';

describe('PoapprovalpopupComponent', () => {
  let component: PoapprovalpopupComponent;
  let fixture: ComponentFixture<PoapprovalpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoapprovalpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoapprovalpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
