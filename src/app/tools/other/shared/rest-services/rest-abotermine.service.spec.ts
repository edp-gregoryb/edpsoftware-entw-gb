import { TestBed } from '@angular/core/testing';

import { RestAbotermineService } from './rest-abotermine.service';

describe('RestAbotermineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAbotermineService = TestBed.get(RestAbotermineService);
    expect(service).toBeTruthy();
  });
});
