import { TestBed } from '@angular/core/testing';

import { RestUmlunterbruchService } from './rest-umlunterbruch.service';

describe('RestUmlunterbruchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestUmlunterbruchService = TestBed.get(RestUmlunterbruchService);
    expect(service).toBeTruthy();
  });
});
