import { TestBed, inject } from '@angular/core/testing';

import { RestProduktService } from './rest-produkt.service';

describe('RestProduktService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestProduktService]
    });
  });

  it('should be created', inject([RestProduktService], (service: RestProduktService) => {
    expect(service).toBeTruthy();
  }));
});
