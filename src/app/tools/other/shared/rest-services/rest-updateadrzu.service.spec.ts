import { TestBed } from '@angular/core/testing';

import { RestUpdateadrzuService } from './rest-updateadrzu.service';

describe('RestUpdateadrzuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUpdateadrzuService = TestBed.get(RestUpdateadrzuService);
    expect(service).toBeTruthy();
  });
});
