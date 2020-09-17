import { TestBed } from '@angular/core/testing';

import { RestEmpfaengerService } from './rest-empfaenger.service';

describe('RestEmpfaengerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestEmpfaengerService = TestBed.get(RestEmpfaengerService);
    expect(service).toBeTruthy();
  });
});
