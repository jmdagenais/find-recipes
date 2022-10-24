import { TimeFormatPipe } from './time-format.pipe';

describe('TimeFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new TimeFormatPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform time properly when <60 minutes', () => {
    const pipe = new TimeFormatPipe();

    const output = pipe.transform(30);

    expect(output).toEqual('30 min.');
  });

  it('transform time properly when 60 minutes', () => {
    const pipe = new TimeFormatPipe();

    const output = pipe.transform(60);

    expect(output).toEqual('1h');
  });

  it('transform time properly when >60 minutes', () => {
    const pipe = new TimeFormatPipe();

    const output = pipe.transform(85);

    expect(output).toEqual('1h25');
  });

  it('transform time properly when more than 2 hours', () => {
    const pipe = new TimeFormatPipe();

    const output = pipe.transform(180);

    expect(output).toEqual('3h');
  });
});
