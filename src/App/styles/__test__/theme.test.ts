import theme from '../theme';

describe('Theme file', () => {
  test('color must be an object type', () => {
    expect(theme.color).toBeInstanceOf(Object);
  });
});
