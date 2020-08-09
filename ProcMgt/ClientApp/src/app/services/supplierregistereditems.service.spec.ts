import { TestBed } from '@angular/core/testing';

import { SupplierregistereditemsService } from './supplierregistereditems.service';

describe('SupplierregistereditemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierregistereditemsService = TestBed.get(SupplierregistereditemsService);
    expect(service).toBeTruthy();
  });
});
