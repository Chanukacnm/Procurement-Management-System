import { TestBed } from '@angular/core/testing';

import { SuppliertypeService } from './suppliertype.service';

describe('SuppliertypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuppliertypeService = TestBed.get(SuppliertypeService);
    expect(service).toBeTruthy();
  });
});
