import { TestBed } from '@angular/core/testing';

import { SupplieritemsService } from './supplieritems.service';

describe('SupplieritemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplieritemsService = TestBed.get(SupplieritemsService);
    expect(service).toBeTruthy();
  });
});
