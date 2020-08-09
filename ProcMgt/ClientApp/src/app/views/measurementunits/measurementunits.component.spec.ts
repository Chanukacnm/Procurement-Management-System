import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementunitsComponent } from './measurementunits.component';

describe('MeasurementunitsComponent', () => {
  let component: MeasurementunitsComponent;
  let fixture: ComponentFixture<MeasurementunitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementunitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
