/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MerkmaldeleteService } from './merkmaldelete.service';

describe('MerkmaldeleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerkmaldeleteService]
    });
  });

  it('should ...', inject([MerkmaldeleteService], (service: MerkmaldeleteService) => {
    expect(service).toBeTruthy();
  }));
});
