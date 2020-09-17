import { TestBed } from '@angular/core/testing';

import { RestDeleteadrzuService } from './rest-deleteadrzu.service';

describe('RestDeleteadrzuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestDeleteadrzuService = TestBed.get(RestDeleteadrzuService);
    expect(service).toBeTruthy();
  });
});
