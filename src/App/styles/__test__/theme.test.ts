import { theme } from '@Styles';

describe('Theme file', () => {
  test('color must be an object type', () => {
    expect(theme.color).toBeInstanceOf(Object);
  });
});
