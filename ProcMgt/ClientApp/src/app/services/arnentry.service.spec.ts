import { TestBed } from '@angular/core/testing';

import { ArnentryService } from './arnentry.service';

describe('ArnentryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArnentryService = TestBed.get(ArnentryService);
    expect(service).toBeTruthy();
  });
});
