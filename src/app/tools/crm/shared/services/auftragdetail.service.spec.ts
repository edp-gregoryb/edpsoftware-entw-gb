/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuftragdetailService } from './auftragdetail.service';

describe('AuftragdetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuftragdetailService]
    });
  });

  it('should ...', inject([AuftragdetailService], (service: AuftragdetailService) => {
    expect(service).toBeTruthy();
  }));
});
