import { TestBed, inject } from '@angular/core/testing';

import { OsgruppennamenService } from './osgruppennamen.service';

describe('OsgruppennamenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OsgruppennamenService]
    });
  });

  it('should be created', inject([OsgruppennamenService], (service: OsgruppennamenService) => {
    expect(service).toBeTruthy();
  }));
});
