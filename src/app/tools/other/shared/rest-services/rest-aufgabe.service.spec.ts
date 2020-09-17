import { TestBed, inject } from '@angular/core/testing';

import { RestAufgabeService } from './rest-aufgabe.service';

describe('RestAufgabeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestAufgabeService]
    });
  });

  it('should be created', inject([RestAufgabeService], (service: RestAufgabeService) => {
    expect(service).toBeTruthy();
  }));
});
