import { TestBed } from '@angular/core/testing';

import { RestAbopreisService } from './rest-abopreis.service';

describe('RestAbopreisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAbopreisService = TestBed.get(RestAbopreisService);
    expect(service).toBeTruthy();
  });
});
