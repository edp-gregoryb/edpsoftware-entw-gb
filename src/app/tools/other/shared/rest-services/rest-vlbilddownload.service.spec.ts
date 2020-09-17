import { TestBed } from '@angular/core/testing';

import { RestVlbilddownloadService } from './rest-vlbilddownload.service';

describe('RestVlbilddownloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVlbilddownloadService = TestBed.get(RestVlbilddownloadService);
    expect(service).toBeTruthy();
  });
});
