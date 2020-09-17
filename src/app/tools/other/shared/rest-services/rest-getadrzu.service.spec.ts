import { TestBed } from '@angular/core/testing';

import { RestGetadrzuService } from './rest-getadrzu.service';

describe('RestGetadrzuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestGetadrzuService = TestBed.get(RestGetadrzuService);
    expect(service).toBeTruthy();
  });
});
