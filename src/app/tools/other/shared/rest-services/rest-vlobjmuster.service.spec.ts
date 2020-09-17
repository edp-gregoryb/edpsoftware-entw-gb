import { TestBed } from '@angular/core/testing';

import { RestVlobjmusterService } from './rest-vlobjmuster.service';

describe('RestVlobjmusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlobjmusterService = TestBed.get(RestVlobjmusterService);
    expect(service).toBeTruthy();
  });
});
