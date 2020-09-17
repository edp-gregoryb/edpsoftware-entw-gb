import { AdressverwaltungModule } from './adressverwaltung.module';

describe('AdressverwaltungModule', () => {
  let adressverwaltungModule: AdressverwaltungModule;

  beforeEach(() => {
    adressverwaltungModule = new AdressverwaltungModule();
  });

  it('should create an instance', () => {
    expect(adressverwaltungModule).toBeTruthy();
  });
});
