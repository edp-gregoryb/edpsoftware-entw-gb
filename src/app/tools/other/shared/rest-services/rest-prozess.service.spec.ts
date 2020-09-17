import { TestBed, inject } from '@angular/core/testing';

import { RestProzessService } from './rest-prozess.service';

describe('RestProzessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestProzessService]
    });
  });

  it('should be created', inject([RestProzessService], (service: RestProzessService) => {
    expect(service).toBeTruthy();
  }));
});
