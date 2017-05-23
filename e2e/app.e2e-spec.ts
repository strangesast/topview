import { TopviewPage } from './app.po';

describe('topview App', () => {
  let page: TopviewPage;

  beforeEach(() => {
    page = new TopviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
