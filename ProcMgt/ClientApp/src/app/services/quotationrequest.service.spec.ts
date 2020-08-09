import { TestBed } from '@angular/core/testing';

import { QuotationrequestService } from './quotationrequest.service';

describe('QuotationrequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuotationrequestService = TestBed.get(QuotationrequestService);
    expect(service).toBeTruthy();
  });
});
