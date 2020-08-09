import { TestBed } from '@angular/core/testing';

import { SuppliermasterService } from './suppliermaster.service';

describe('SuppliermasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuppliermasterService = TestBed.get(SuppliermasterService);
    expect(service).toBeTruthy();
  });
});
