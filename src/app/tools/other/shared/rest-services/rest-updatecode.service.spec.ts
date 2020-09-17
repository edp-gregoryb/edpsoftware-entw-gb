import { TestBed } from '@angular/core/testing';

import { RestUpdatecodeService } from './rest-updatecode.service';

describe('RestUpdatecodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUpdatecodeService = TestBed.get(RestUpdatecodeService);
    expect(service).toBeTruthy();
  });
});
