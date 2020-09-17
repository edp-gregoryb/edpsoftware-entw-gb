import { AdressauswahlModule } from './adressauswahl.module';

describe('AdressauswahlModule', () => {
  let adressauswahlModule: AdressauswahlModule;

  beforeEach(() => {
    adressauswahlModule = new AdressauswahlModule();
  });

  it('should create an instance', () => {
    expect(adressauswahlModule).toBeTruthy();
  });
});
