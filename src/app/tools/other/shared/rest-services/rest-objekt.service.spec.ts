import { TestBed, inject } from '@angular/core/testing';

import { RestObjektService } from './rest-objekt.service';

describe('RestObjektService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestObjektService]
    });
  });

  it('should be created', inject([RestObjektService], (service: RestObjektService) => {
    expect(service).toBeTruthy();
  }));
});
