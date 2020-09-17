import { TestBed } from '@angular/core/testing';

import { RestAbomerkstService } from './rest-abomerkst.service';

describe('RestAbomerkstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAbomerkstService = TestBed.get(RestAbomerkstService);
    expect(service).toBeTruthy();
  });
});
