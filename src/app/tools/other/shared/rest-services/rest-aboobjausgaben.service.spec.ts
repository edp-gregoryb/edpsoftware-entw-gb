import { TestBed } from '@angular/core/testing';

import { RestAboobjausgabenService } from './rest-aboobjausgaben.service';

describe('RestAboobjausgabenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAboobjausgabenService = TestBed.get(RestAboobjausgabenService);
    expect(service).toBeTruthy();
  });
});
