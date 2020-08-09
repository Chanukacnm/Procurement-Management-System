import { TestBed } from '@angular/core/testing';

import { ItemtypeService } from './itemtype.service';

describe('ItemtypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemtypeService = TestBed.get(ItemtypeService);
    expect(service).toBeTruthy();
  });
});
