import { TestBed, inject } from '@angular/core/testing';

import { GetofferteService } from './getofferte.service';

describe('GetofferteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetofferteService]
    });
  });

  it('should be created', inject([GetofferteService], (service: GetofferteService) => {
    expect(service).toBeTruthy();
  }));
});
