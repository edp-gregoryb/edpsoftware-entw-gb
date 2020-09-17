/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MitarbeiterService } from './mitarbeiter.service';

describe('MitarbeiterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MitarbeiterService]
    });
  });

  it('should ...', inject([MitarbeiterService], (service: MitarbeiterService) => {
    expect(service).toBeTruthy();
  }));
});
