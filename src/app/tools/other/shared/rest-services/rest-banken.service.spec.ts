import { TestBed } from '@angular/core/testing';

import { RestBankenService } from './rest-banken.service';

describe('RestBankenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestBankenService = TestBed.get(RestBankenService);
    expect(service).toBeTruthy();
  });
});
