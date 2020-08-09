import { TestBed } from '@angular/core/testing';

import { QuotationenterService } from './quotationenter.service';

describe('QuotationenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationenterService = TestBed.get(QuotationenterService);
    expect(service).toBeTruthy();
  });
});
