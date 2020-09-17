/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UmsatzService } from './umsatz.service';

describe('UmsatzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UmsatzService]
    });
  });

  it('should ...', inject([UmsatzService], (service: UmsatzService) => {
    expect(service).toBeTruthy();
  }));
});
