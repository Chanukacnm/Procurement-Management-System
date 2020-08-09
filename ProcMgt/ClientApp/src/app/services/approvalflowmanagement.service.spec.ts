import { TestBed } from '@angular/core/testing';

import { ApprovalflowmanagementService } from './approvalflowmanagement.service';

describe('ApprovalflowmanagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovalflowmanagementService = TestBed.get(ApprovalflowmanagementService);
    expect(service).toBeTruthy();
  });
});
