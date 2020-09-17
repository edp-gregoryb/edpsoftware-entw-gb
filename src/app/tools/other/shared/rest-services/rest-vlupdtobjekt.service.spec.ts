import { TestBed } from '@angular/core/testing';

import { RestVlupdtobjektService } from './rest-vlupdtobjekt.service';

describe('RestVlupdtobjektService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlupdtobjektService = TestBed.get(RestVlupdtobjektService);
    expect(service).toBeTruthy();
  });
});
