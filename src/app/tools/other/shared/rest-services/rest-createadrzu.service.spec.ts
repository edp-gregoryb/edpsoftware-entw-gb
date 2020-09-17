import { TestBed } from '@angular/core/testing';

import { RestCreateadrzuService } from './rest-createadrzu.service';

describe('RestCreateadrzuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestCreateadrzuService = TestBed.get(RestCreateadrzuService);
    expect(service).toBeTruthy();
  });
});
