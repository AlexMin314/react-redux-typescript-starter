import * as P from '../products';
import { PRODUCT } from '@Constants';

describe('_Core utils - products.ts', () => {
  test('matchProduct should work as expected', () => {
    expect(P.matchProduct(PRODUCT.PTV.TYPE)(PRODUCT.PTV.TYPE)).toBe(true);
    expect(P.matchProduct(PRODUCT.PTV.TYPE)(PRODUCT.PL.TYPE)).toBe(false);
  });
  test('isValidProd should work as expected', () => {
    expect(P.isValidProd('alex')).toBe(false);
    expect(P.isValidProd(PRODUCT.PA.TYPE)).toBe(true);
  });
  test('isGenderSpecificProd should work as expected', () => {
    expect(P.isGenderSpecificProd(PRODUCT.PA.TYPE)).toBe(false);
    expect(P.isGenderSpecificProd(PRODUCT.PM.TYPE)).toBe(true);
    expect(P.isGenderSpecificProd(PRODUCT.PL.TYPE)).toBe(true);
  });
  test('isMaleProd should work as expected', () => {
    expect(P.isMaleProd(PRODUCT.PA.TYPE)).toBe(false);
    expect(P.isMaleProd(PRODUCT.PL.TYPE)).toBe(false);
    expect(P.isMaleProd(PRODUCT.PM.TYPE)).toBe(true);
  });
  test('isMaleProd should work as expected', () => {
    expect(P.isFemaleProd(PRODUCT.PA.TYPE)).toBe(false);
    expect(P.isFemaleProd(PRODUCT.PM.TYPE)).toBe(false);
    expect(P.isFemaleProd(PRODUCT.PL.TYPE)).toBe(true);
  });
});
