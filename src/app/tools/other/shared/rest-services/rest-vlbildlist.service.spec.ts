import { TestBed } from '@angular/core/testing';

import { RestVlbildlistService } from './rest-vlbildlist.service';

describe('RestVlbildlistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlbildlistService = TestBed.get(RestVlbildlistService);
    expect(service).toBeTruthy();
  });
});
