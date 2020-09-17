import { CodenModule } from './coden.module';

describe('CodenModule', () => {
  let codenModule: CodenModule;

  beforeEach(() => {
    codenModule = new CodenModule();
  });

  it('should create an instance', () => {
    expect(codenModule).toBeTruthy();
  });
});
