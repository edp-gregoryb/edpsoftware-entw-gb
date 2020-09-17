import { TestBed, inject } from '@angular/core/testing';

import { RestFortschrittService } from './rest-fortschritt.service';

describe('RestFortschrittService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestFortschrittService]
    });
  });

  it('should be created', inject([RestFortschrittService], (service: RestFortschrittService) => {
    expect(service).toBeTruthy();
  }));
});
