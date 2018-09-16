import * as F from '../functional';

describe('_Core utils - functional.ts', () => {
  test('identity should return identical value', () => {
    expect(F.identity('alex')).toBe('alex');
  });
  test('andSeq should return false if any arugment is false', () => {
    expect(F.andSeq(true, true, true)).toBe(true);
    expect(F.andSeq(true, false, false)).toBe(false);
  });
  test('andSeq should return false if any arugment is false', () => {
    expect(F.orSeq(true, true, true)).toBe(true);
    expect(F.orSeq(true, false, false)).toBe(true);
    expect(F.orSeq(false, false, false)).toBe(false);
  });
  test('predicateAndSeq should return false once any predicate return false during sequencial excution', () => {
    const result = F.predicateAndSeq(
      (pipe) => pipe === 'alex',
      (pipe) => pipe === 'akilan',
    )('alex');
    expect(result).toBe(false);
  });
  test('predicateOrSeq should return true once any predicate return true during sequencial excution', () => {
    const result = F.predicateOrSeq(
      (pipe) => pipe === 'akilan',
      (pipe) => pipe === 'alex',
    )('alex');
    expect(result).toBe(true);
  });
  test('combineSeqsAsAnd should return false once any combined predicate return false during sequencial excution', () => {
    const result1 = F.combineSeqsAsAnd(
      F.predicateAndSeq(
        (pipe1) => pipe1 === 'alex',
        (pipe1) => pipe1 === 'alex',
      ),
      F.predicateAndSeq(
        (pipe2) => pipe2 === 'alex',
        (pipe2) => pipe2 === 'akilan',
      ),
    )('alex', 'akilan');
    const result2 = F.combineSeqsAsAnd(
      F.predicateAndSeq(
        (pipe1) => pipe1 === 'alex',
        (pipe1) => pipe1 === 'alex',
      ),
      F.predicateAndSeq(
        (pipe2) => pipe2 === 'akilan',
        (pipe2) => pipe2 === 'akilan',
      ),
    )('alex', 'akilan');
    expect(result1).toBe(false);
    expect(result2).toBe(true);
  });
  test('combineSeqsAsAnd should return false once any combined predicate return false during sequencial excution', () => {
    const result1 = F.combineSeqsAsOr(
      F.predicateAndSeq(
        (pipe1) => pipe1 === 'alex',
        (pipe1) => pipe1 === 'alex',
      ),
      F.predicateAndSeq(
        (pipe2) => pipe2 === 'alex',
        (pipe2) => pipe2 === 'akilan',
      ),
    )('alex', 'akilan');
    const result2 = F.combineSeqsAsOr(
      F.predicateAndSeq(
        (pipe1) => pipe1 === 'alex',
        (pipe1) => pipe1 === 'alex',
      ),
      F.predicateAndSeq(
        (pipe2) => pipe2 === 'akilan',
        (pipe2) => pipe2 === 'akilan',
      ),
    )('alex', 'akilan');
    expect(result1).toBe(true);
    expect(result2).toBe(true);
  });
  test('PipeM should pipe state as expected', () => {
    const mockMutator1 = (p: any) => (s: any) => ({ ...s, prod: !p.prod });
    const mockMutator2 = (p: any) => (s: any) => ({ ...s, name: `${p.name} hello` });
    const mockPayload1 = { prod: false };
    const mockPayload2 = { name: 'alex' };
    const result1 = F.pipeM(
      mockMutator1(mockPayload1),
    )({});
    const result2 = F.pipeM(
      mockMutator1(mockPayload1),
      mockMutator2(mockPayload2),
    )({});
    expect(result1.prod).toBe(true);
    expect(result2.name).toBe('alex hello');
  });
});
