import { GnosissPage } from './app.po';

describe('gnosiss App', () => {
  let page: GnosissPage;

  beforeEach(() => {
    page = new GnosissPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
