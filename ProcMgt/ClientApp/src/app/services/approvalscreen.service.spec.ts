import { TestBed } from '@angular/core/testing';

import { ApprovalscreenService } from './approvalscreen.service';

describe('ApprovalscreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalscreenService = TestBed.get(ApprovalscreenService);
    expect(service).toBeTruthy();
  });
});
