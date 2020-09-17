import { TestBed } from '@angular/core/testing';

import { RestSaldoService } from './rest-saldo.service';

describe('RestSaldoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestSaldoService = TestBed.get(RestSaldoService);
    expect(service).toBeTruthy();
  });
});
