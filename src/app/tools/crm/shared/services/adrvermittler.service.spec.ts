/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdrvermittlerService } from './adrvermittler.service';

describe('AdrvermittlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdrvermittlerService]
    });
  });

  it('should ...', inject([AdrvermittlerService], (service: AdrvermittlerService) => {
    expect(service).toBeTruthy();
  }));
});
