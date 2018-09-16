import * as P from '@/App/constants/products';
import { throwError, isTruthyString, isMemberOf, isMatched } from '@/App/utils/commons';
import { predicateAndSeq, predicateOrSeq } from '@/App/utils/functional';

const isMatchedProd = isMatched(P.PRODUCT);

export const isValidProd: Matcher<string> = pType => predicateAndSeq(
  isTruthyString,
  isMemberOf(P.PRODUCT),
)(pType);

export const matchProduct: CurriedMatcher1<string, string> = (enumKey) =>
  P.PRODUCT[enumKey as keyof P.IPRODUCT]
    ? (pType) => predicateAndSeq(isTruthyString, isMatchedProd(enumKey, 'TYPE'))(pType)
    : throwError('[DEV] The first argument string must be the member of the product enum.');

export const isGenderSpecificProd: Matcher<string> = pType => predicateAndSeq(
  isTruthyString,
  predicateOrSeq(
    matchProduct(P.PM.TYPE),
    matchProduct(P.PL.TYPE),
  ),
)(pType);

export const isMaleProd: Matcher<string> = pType => predicateAndSeq(
  isTruthyString,
  predicateOrSeq(
    matchProduct(P.PM.TYPE),
  ),
)(pType);

export const isFemaleProd: Matcher<string> = pType => predicateAndSeq(
  isTruthyString,
  predicateOrSeq(
    matchProduct(P.PL.TYPE),
  ),
)(pType);
