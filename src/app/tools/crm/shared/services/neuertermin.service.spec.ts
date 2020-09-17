/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NeuerterminService } from './neuertermin.service';

describe('NeuerterminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NeuerterminService]
    });
  });

  it('should ...', inject([NeuerterminService], (service: NeuerterminService) => {
    expect(service).toBeTruthy();
  }));
});
