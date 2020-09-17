import { TestBed, inject } from '@angular/core/testing';

import { RestgetberechtstufenService } from './restgetberechtstufen.service';

describe('RestgetberechtstufenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestgetberechtstufenService]
    });
  });

  it('should be created', inject([RestgetberechtstufenService], (service: RestgetberechtstufenService) => {
    expect(service).toBeTruthy();
  }));
});
