import { TestBed } from '@angular/core/testing';

import { RestAbokategorieService } from './rest-abokategorie.service';

describe('RestAbokategorieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAbokategorieService = TestBed.get(RestAbokategorieService);
    expect(service).toBeTruthy();
  });
});
