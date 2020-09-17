import { TestBed } from '@angular/core/testing';

import { GetaboinfoService } from './getaboinfo.service';

describe('GetaboinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetaboinfoService = TestBed.get(GetaboinfoService);
    expect(service).toBeTruthy();
  });
});
