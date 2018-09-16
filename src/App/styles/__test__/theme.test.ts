import theme from '@/App/styles/theme';

describe('Theme file', () => {
  test('color must be an object type', () => {
    expect(theme.color).toBeInstanceOf(Object);
  });
});
