import { TestBed } from '@angular/core/testing';

import { MinimumItemsCapacityService } from './minimumitemscapacity.service';

describe('MinimumitemscapacityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MinimumItemsCapacityService = TestBed.get(MinimumItemsCapacityService);
    expect(service).toBeTruthy();
  });
});
