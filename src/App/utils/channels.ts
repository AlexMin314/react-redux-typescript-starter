import * as C from '@Constants/channels';
import { throwError, isTruthyString, isMemberOf, isMatched } from './commons';
import { predicateAndSeq } from './functional';

const isMatchedCH = isMatched(C.CHANNEL);

const _isNotNormalChannel: Matcher<string> = (ch) => !isMatchedCH(ch)(C.CHANNEL.NML);

export const isValidChannel: Matcher<string> = (ch) => predicateAndSeq(
  isTruthyString,
  _isNotNormalChannel,
  isMemberOf(C.CHANNEL),
)(ch);

export const isPacsChannel: Matcher<string> = (ch) => predicateAndSeq(
  isTruthyString,
  isMemberOf(C.PACS_CHANNEL),
)(ch);

export const isPartnerChannel: Matcher<string> = (ch) => predicateAndSeq(
  isTruthyString,
  isMemberOf(C.PARTNER_CHANNEL),
)(ch);

// matching the two channel is same or not.
export const matchChannel: CurriedMatcher1<string, string> = (enumKey) =>
  C.CHANNEL[enumKey as C.CHANNEL_KEYS]
    ? (ch) => predicateAndSeq(isTruthyString, isMatchedCH(enumKey))(ch)
    : throwError('[DEV] The first argument string must be the member of the channel enum.');
