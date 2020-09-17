/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TerminhistoryService } from './terminhistory.service';

describe('TerminhistoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminhistoryService]
    });
  });

  it('should ...', inject([TerminhistoryService], (service: TerminhistoryService) => {
    expect(service).toBeTruthy();
  }));
});
