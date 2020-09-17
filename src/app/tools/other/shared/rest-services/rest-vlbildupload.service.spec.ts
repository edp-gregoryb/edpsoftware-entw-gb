import { TestBed } from '@angular/core/testing';

import { RestVlbilduploadService } from './rest-vlbildupload.service';

describe('RestVlbilduploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlbilduploadService = TestBed.get(RestVlbilduploadService);
    expect(service).toBeTruthy();
  });
});
