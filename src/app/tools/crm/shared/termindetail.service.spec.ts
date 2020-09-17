/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TermindetailService } from './termindetail.service';

describe('TermindetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TermindetailService]
    });
  });

  it('should ...', inject([TermindetailService], (service: TermindetailService) => {
    expect(service).toBeTruthy();
  }));
});
