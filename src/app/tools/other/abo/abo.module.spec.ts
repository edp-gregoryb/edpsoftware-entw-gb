import { AboModule } from './abo.module';

describe('AboModule', () => {
  let aboModule: AboModule;

  beforeEach(() => {
    aboModule = new AboModule();
  });

  it('should create an instance', () => {
    expect(aboModule).toBeTruthy();
  });
});
