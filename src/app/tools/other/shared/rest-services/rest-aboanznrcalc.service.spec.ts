import { TestBed } from '@angular/core/testing';

import { RestAboanznrcalcService } from './rest-aboanznrcalc.service';

describe('RestAboanznrcalcService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestAboanznrcalcService = TestBed.get(RestAboanznrcalcService);
    expect(service).toBeTruthy();
  });
});
