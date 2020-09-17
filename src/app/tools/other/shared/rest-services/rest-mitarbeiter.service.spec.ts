import { TestBed } from '@angular/core/testing';

import { RestMitarbeiterService } from './rest-mitarbeiter.service';

describe('RestMitarbeiterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestMitarbeiterService = TestBed.get(RestMitarbeiterService);
    expect(service).toBeTruthy();
  });
});
