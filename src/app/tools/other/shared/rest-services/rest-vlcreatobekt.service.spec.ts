import { TestBed } from '@angular/core/testing';

import { RestVlcreatobektService } from './rest-vlcreatobekt.service';

describe('RestVlcreatobektService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlcreatobektService = TestBed.get(RestVlcreatobektService);
    expect(service).toBeTruthy();
  });
});
