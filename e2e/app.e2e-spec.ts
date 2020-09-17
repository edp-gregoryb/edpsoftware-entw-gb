import { RouterExampPage } from './app.po';

describe('router-examp App', function() {
  let page: RouterExampPage;

  beforeEach(() => {
    page = new RouterExampPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
