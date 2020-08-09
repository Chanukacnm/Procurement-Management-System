import { TestBed } from '@angular/core/testing';

import { PurchaseorderService } from './purchaseorder.service';

describe('PurchaseorderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseorderService = TestBed.get(PurchaseorderService);
    expect(service).toBeTruthy();
  });
});
