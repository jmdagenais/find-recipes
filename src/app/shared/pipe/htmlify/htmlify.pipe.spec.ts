import { HtmlifyPipe } from './htmlify.pipe';

describe('HtmlizePipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlifyPipe();
    expect(pipe).toBeTruthy();
  });

  it('convert BBcode to html', () => {
    const pipe = new HtmlifyPipe();
    const htmlText = pipe.transform('[b]bold[/b] - [i]italic[/i] - [u]underline[/u]');

    expect(htmlText).toEqual('<b>bold</b> - <i>italic</i> - <u>underline</u>');
  });

  it('converts text to <li> elements', () => {
    const pipe = new HtmlifyPipe();
    const input = `--item1
      --item2
      --item3`;

    const expected = `<li><span class="font-normal">item1</span></li>
      <li><span class="font-normal">item2</span></li>
      <li><span class="font-normal">item3</span></li>`;

    expect(pipe.transform(input)).toEqual(expected);
  });
});
