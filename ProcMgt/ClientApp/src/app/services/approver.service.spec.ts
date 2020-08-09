import { TestBed } from '@angular/core/testing';

import { ApproverService } from './approver.service';

describe('ApproverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproverService = TestBed.get(ApproverService);
    expect(service).toBeTruthy();
  });
});
