/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TerminverschiebenService } from './terminverschieben.service';

describe('TerminverschiebenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminverschiebenService]
    });
  });

  it('should ...', inject([TerminverschiebenService], (service: TerminverschiebenService) => {
    expect(service).toBeTruthy();
  }));
});
