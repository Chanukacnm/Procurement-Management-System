import { TestBed } from '@angular/core/testing';

import { ItemcategoryService } from './itemcategory.service';

describe('ItemcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemcategoryService = TestBed.get(ItemcategoryService);
    expect(service).toBeTruthy();
  });
});
