import { TestBed } from '@angular/core/testing';

import { FisVLObjektdetailsService } from './fis-vlobjektdetails.service';

describe('FisVLObjektdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FisVLObjektdetailsService = TestBed.get(FisVLObjektdetailsService);
    expect(service).toBeTruthy();
  });
});
