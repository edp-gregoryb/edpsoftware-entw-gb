/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemonewService } from './memonew.service';

describe('MemonewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemonewService]
    });
  });

  it('should ...', inject([MemonewService], (service: MemonewService) => {
    expect(service).toBeTruthy();
  }));
});
