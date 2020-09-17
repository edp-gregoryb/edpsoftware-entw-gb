import { TestBed } from '@angular/core/testing';

import { RestVldelteprodanhangService } from './rest-vldelteprodanhang.service';

describe('RestVldelteprodanhangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestVldelteprodanhangService = TestBed.get(RestVldelteprodanhangService);
    expect(service).toBeTruthy();
  });
});
