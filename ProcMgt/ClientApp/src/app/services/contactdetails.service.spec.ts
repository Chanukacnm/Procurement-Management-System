import { TestBed } from '@angular/core/testing';

import { ContactdetailsService } from './contactdetails.service';

describe('ContactdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactdetailsService = TestBed.get(ContactdetailsService);
    expect(service).toBeTruthy();
  });
});
