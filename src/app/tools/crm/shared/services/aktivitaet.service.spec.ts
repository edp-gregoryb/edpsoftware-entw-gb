/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AktivitaetService } from './aktivitaet.service';

describe('AktivitaetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AktivitaetService]
    });
  });

  it('should ...', inject([AktivitaetService], (service: AktivitaetService) => {
    expect(service).toBeTruthy();
  }));
});
