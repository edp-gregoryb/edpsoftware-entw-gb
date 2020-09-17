/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MerkmaladdService } from './merkmaladd.service';

describe('MerkmaladdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerkmaladdService]
    });
  });

  it('should ...', inject([MerkmaladdService], (service: MerkmaladdService) => {
    expect(service).toBeTruthy();
  }));
});
