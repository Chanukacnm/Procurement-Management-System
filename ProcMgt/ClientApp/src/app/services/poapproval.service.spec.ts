import { TestBed } from '@angular/core/testing';

import { PoapprovalService } from './poapproval.service';

describe('PoapprovalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoapprovalService = TestBed.get(PoapprovalService);
    expect(service).toBeTruthy();
  });
});
