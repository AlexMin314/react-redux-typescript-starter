import { globalStyle } from '../globalStyle';

describe('globalStyle file', () => {
  test('globalStyle is a function', () => {
    expect(globalStyle).toBeInstanceOf(Function);
  });
});
