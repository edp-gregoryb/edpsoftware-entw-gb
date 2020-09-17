import { TestBed, inject } from '@angular/core/testing';

import { FarosgetinseratejpgService } from './farosgetinseratejpg.service';

describe('FarosgetinseratejpgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarosgetinseratejpgService]
    });
  });

  it('should be created', inject([FarosgetinseratejpgService], (service: FarosgetinseratejpgService) => {
    expect(service).toBeTruthy();
  }));
});
