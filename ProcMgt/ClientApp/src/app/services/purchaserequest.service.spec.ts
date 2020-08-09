import { TestBed } from '@angular/core/testing';

import { PurchaserequestService } from './purchaserequest.service';

describe('PurchaserequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaserequestService = TestBed.get(PurchaserequestService);
    expect(service).toBeTruthy();
  });
});
