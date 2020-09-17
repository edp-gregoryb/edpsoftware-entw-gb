import { TestBed } from '@angular/core/testing';

import { WfindexdbService } from './wfindexdb.service';

describe('WfindexdbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WfindexdbService = TestBed.get(WfindexdbService);
    expect(service).toBeTruthy();
  });
});
