import { FastfarmCoPage } from './app.po';

describe('fastfarm-co App', () => {
  let page: FastfarmCoPage;

  beforeEach(() => {
    page = new FastfarmCoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
