/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemouebersichtService } from './memouebersicht.service';

describe('MemouebersichtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemouebersichtService]
    });
  });

  it('should ...', inject([MemouebersichtService], (service: MemouebersichtService) => {
    expect(service).toBeTruthy();
  }));
});
