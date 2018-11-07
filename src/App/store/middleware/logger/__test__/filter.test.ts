import { getFilterList } from '@/App/store/middleware/logger/filter';

describe('Logger Middleware - filter', () => {

  const mockAction = {
    type: 'Test Action',
    payload: {
      data: {
        name: 'alex',
      },
    },
    error: false,
  };

  test('getFilterList should return false when the action type is in the blackListed', () => {
    const options = {
      pw: 'hello',
      blackListed: ['Test'],
    };
    const filterCheck = getFilterList(options);
    expect(filterCheck(mockAction)).toBe(false);
  });
  test('getFilterList should return true when the action type is in the whiteListed', () => {
    const options = {
      pw: 'hello',
      whiteListed: ['Action'],
      blackListed: ['Test'],
    };
    const filterCheck = getFilterList(options);
    expect(filterCheck(mockAction)).toBe(true);
  });
  test('getFilterList should return true', () => {
    const options = {
      pw: 'hello',
    };
    const filterCheck = getFilterList(options);
    expect(filterCheck(mockAction)).toBe(true);
  });
});
