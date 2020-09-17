/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MerkmalbasisService } from './merkmalbasis.service';

describe('MerkmalbasisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerkmalbasisService]
    });
  });

  it('should ...', inject([MerkmalbasisService], (service: MerkmalbasisService) => {
    expect(service).toBeTruthy();
  }));
});
