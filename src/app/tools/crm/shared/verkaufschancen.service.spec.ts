/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VerkaufschancenService } from './verkaufschancen.service';

describe('VerkaufschancenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerkaufschancenService]
    });
  });

  it('should ...', inject([VerkaufschancenService], (service: VerkaufschancenService) => {
    expect(service).toBeTruthy();
  }));
});
