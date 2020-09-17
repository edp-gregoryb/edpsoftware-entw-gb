import { TestBed } from '@angular/core/testing';

import { RestSetdeleteaboService } from './rest-setdeleteabo.service';

describe('RestSetdeleteaboService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestSetdeleteaboService = TestBed.get(RestSetdeleteaboService);
    expect(service).toBeTruthy();
  });
});
