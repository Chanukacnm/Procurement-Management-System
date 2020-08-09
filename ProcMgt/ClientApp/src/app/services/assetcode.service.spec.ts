import { TestBed } from '@angular/core/testing';

import { AssetcodeService } from './assetcode.service';

describe('AssetcodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetcodeService = TestBed.get(AssetcodeService);
    expect(service).toBeTruthy();
  });
});
