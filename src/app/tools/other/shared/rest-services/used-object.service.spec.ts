import { TestBed } from '@angular/core/testing';

import { UsedObjectService } from './used-object.service';

describe('UsedObjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsedObjectService = TestBed.get(UsedObjectService);
    expect(service).toBeTruthy();
  });
});
