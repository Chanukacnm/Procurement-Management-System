import { TestBed } from '@angular/core/testing';

import { AccounttypeService } from './accounttype.service';

describe('AccounttypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccounttypeService = TestBed.get(AccounttypeService);
    expect(service).toBeTruthy();
  });
});
