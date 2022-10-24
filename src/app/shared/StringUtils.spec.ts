import {StringUtils} from './StringUtils';

describe('Test StringUtils', () => {

  it('should escape string correctly', () => {
    const output = StringUtils.escapeString('this is <b>bold</b>');

    expect(output).toEqual('this is &lt;b&gt;bold&lt;/b&gt;');
  });

  it('removes HTML entities', () => {
    const output = StringUtils.removeHtmlEntities('line1&#10;line2&#38;');

    expect(output).toEqual('line1\nline2&');
  });

});
