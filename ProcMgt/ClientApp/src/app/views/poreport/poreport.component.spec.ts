import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoreportComponent } from './poreport.component';

describe('PoreportComponent', () => {
  let component: PoreportComponent;
  let fixture: ComponentFixture<PoreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
