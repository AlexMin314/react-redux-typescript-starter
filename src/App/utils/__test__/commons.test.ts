import * as C from './../commons';
import { PRODUCT, CHANNEL } from '@Constants';

describe('_Core utils - commons.ts', () => {
  test('isMatched should return boolean properly', () => {
    expect(C.isMatched(PRODUCT)('PTV', 'TYPE')('PTV')).toBe(true);
    expect(C.isMatched(PRODUCT)('PTV', 'TYPE')('PT')).toBe(false);
    expect(C.isMatched(CHANNEL)('DIA')('DIA')).toBe(true);
    expect(C.isMatched(CHANNEL)('DIA')('UOB')).toBe(false);
  });
  test('isTruthyString should check empty string is falsy value', () => {
    expect(C.isTruthyString('')).toBe(false);
    expect(C.isTruthyString('hello')).toBe(true);
  });
  test('isMemberOf should work as expected', () => {
    expect(C.isMemberOf(PRODUCT)('PTV')).toBe(true);
    expect(C.isMemberOf<any>(PRODUCT)('alex')).toBe(false);
  });
  test('throwError should throw error', () => {
    expect(C.throwError('error')).toThrow();
  });
});
