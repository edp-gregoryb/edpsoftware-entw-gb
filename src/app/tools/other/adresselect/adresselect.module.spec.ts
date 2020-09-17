import { AdresselectModule } from './adresselect.module';

describe('AdresselectModule', () => {
  let adresselectModule: AdresselectModule;

  beforeEach(() => {
    adresselectModule = new AdresselectModule();
  });

  it('should create an instance', () => {
    expect(adresselectModule).toBeTruthy();
  });
});
