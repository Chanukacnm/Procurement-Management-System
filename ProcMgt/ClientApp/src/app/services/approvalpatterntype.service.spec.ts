import { TestBed } from '@angular/core/testing';

import { ApprovalpatterntypeService } from './approvalpatterntype.service';

describe('ApprovalpatterntypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalpatterntypeService = TestBed.get(ApprovalpatterntypeService);
    expect(service).toBeTruthy();
  });
});
