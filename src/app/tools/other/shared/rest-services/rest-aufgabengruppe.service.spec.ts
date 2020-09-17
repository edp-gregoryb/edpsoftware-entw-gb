import { TestBed, inject } from '@angular/core/testing';

import { RestAufgabengruppeService } from './rest-aufgabengruppe.service';

describe('RestAufgabengruppeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestAufgabengruppeService]
    });
  });

  it('should be created', inject([RestAufgabengruppeService], (service: RestAufgabengruppeService) => {
    expect(service).toBeTruthy();
  }));
});
