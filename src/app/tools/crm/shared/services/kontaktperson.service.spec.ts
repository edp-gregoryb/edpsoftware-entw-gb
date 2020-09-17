/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { KontaktpersonService } from './kontaktperson.service';

describe('KontaktpersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KontaktpersonService]
    });
  });

  it('should ...', inject([KontaktpersonService], (service: KontaktpersonService) => {
    expect(service).toBeTruthy();
  }));
});
