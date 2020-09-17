/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DelterminService } from './deltermin.service';

describe('DelterminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DelterminService]
    });
  });

  it('should ...', inject([DelterminService], (service: DelterminService) => {
    expect(service).toBeTruthy();
  }));
});
