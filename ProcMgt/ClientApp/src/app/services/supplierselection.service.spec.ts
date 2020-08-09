import { TestBed } from '@angular/core/testing';

import { SupplierselectionService } from './supplierselection.service';

describe('SupplierselectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierselectionService = TestBed.get(SupplierselectionService);
    expect(service).toBeTruthy();
  });
});
