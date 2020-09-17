/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemodelService } from './memodel.service';

describe('MemodelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemodelService]
    });
  });

  it('should ...', inject([MemodelService], (service: MemodelService) => {
    expect(service).toBeTruthy();
  }));
});
