/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FarosGetDateienService } from './faros-get-dateien.service';

describe('FarosGetDateienService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarosGetDateienService]
    });
  });

  it('should ...', inject([FarosGetDateienService], (service: FarosGetDateienService) => {
    expect(service).toBeTruthy();
  }));
});
