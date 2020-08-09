import { TestBed } from '@angular/core/testing';

import { CategorymasterService } from './categorymaster.service';

describe('CategorymasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorymasterService = TestBed.get(CategorymasterService);
    expect(service).toBeTruthy();
  });
});
