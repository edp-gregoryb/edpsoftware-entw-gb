/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarosdateienService } from './farosdateien.service';

describe('FarosdateienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarosdateienService]
    });
  });

  it('should ...', inject([FarosdateienService], (service: FarosdateienService) => {
    expect(service).toBeTruthy();
  }));
});
