import { TestBed } from '@angular/core/testing';

import { RestKommentarService } from './rest-kommentar.service';

describe('RestKommentarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestKommentarService = TestBed.get(RestKommentarService);
    expect(service).toBeTruthy();
  });
});
