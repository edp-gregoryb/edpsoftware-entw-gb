import { TestBed } from '@angular/core/testing';

import { RestDeletecodeService } from './rest-deletecode.service';

describe('RestDeletecodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestDeletecodeService = TestBed.get(RestDeletecodeService);
    expect(service).toBeTruthy();
  });
});
