import { TestBed } from '@angular/core/testing';

import { MeasurementUnitsService } from './measurementunits.service';

describe('MeasurementunitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeasurementUnitsService = TestBed.get(MeasurementUnitsService);
    expect(service).toBeTruthy();
  });
});
