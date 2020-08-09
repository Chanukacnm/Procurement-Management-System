import { TestBed } from '@angular/core/testing';

import { PaymentmethodService } from './paymentmethod.service';

describe('PaymentmethodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentmethodService = TestBed.get(PaymentmethodService);
    expect(service).toBeTruthy();
  });
});
