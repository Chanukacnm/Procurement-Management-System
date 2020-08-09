import { TestBed } from '@angular/core/testing';

import { ReorderlevelService } from './reorderlevel.service';

describe('ReorderlevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReorderlevelService = TestBed.get(ReorderlevelService);
    expect(service).toBeTruthy();
  });
});
