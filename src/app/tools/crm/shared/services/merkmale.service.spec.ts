/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MerkmaleService } from './merkmale.service';

describe('MerkmaleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerkmaleService]
    });
  });

  it('should ...', inject([MerkmaleService], (service: MerkmaleService) => {
    expect(service).toBeTruthy();
  }));
});
