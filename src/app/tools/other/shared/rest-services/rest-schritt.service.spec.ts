import { TestBed, inject } from '@angular/core/testing';

import { RestSchrittService } from './rest-schritt.service';

describe('RestSchrittService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestSchrittService]
    });
  });

  it('should be created', inject([RestSchrittService], (service: RestSchrittService) => {
    expect(service).toBeTruthy();
  }));
});
