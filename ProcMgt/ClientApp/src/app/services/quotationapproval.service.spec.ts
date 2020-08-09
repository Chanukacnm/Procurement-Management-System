import { TestBed } from '@angular/core/testing';

import { QuotationapprovalService } from './quotationapproval.service';

describe('QuotationapprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationapprovalService = TestBed.get(QuotationapprovalService);
    expect(service).toBeTruthy();
  });
});
