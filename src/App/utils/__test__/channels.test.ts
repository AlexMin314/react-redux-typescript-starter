import * as C from '@/App/utils/channels';
import { CHANNEL } from '@/App/constants';

describe('_Core utils channle.ts', () => {
  test('matchChannel should work as expected', () => {
    const EDM = CHANNEL.EDM;
    const UOB = CHANNEL.UOB;
    const NML = CHANNEL.NML;
    expect(C.matchChannel('EDM')(EDM)).toBe(true);
    expect(C.matchChannel('EDM')(UOB)).toBe(false);
    expect(C.matchChannel('NML')(NML)).toBe(true);
  });
  test('isValidChannel should work as expected', () => {
    expect(C.isValidChannel('EDM')).toBe(true);
    expect(C.isValidChannel('UOB')).toBe(true);
    expect(C.isValidChannel('NML')).toBe(false);
    expect(C.isValidChannel('alex')).toBe(false);
    expect(C.isValidChannel('')).toBe(false);
    expect(C.isValidChannel(null)).toBe(false);
  });
  test('isPacsChannel should work as expected', () => {
    expect(C.isPacsChannel('EDM')).toBe(true);
    expect(C.isPacsChannel('UOB')).toBe(false);
    expect(C.isPacsChannel('NML')).toBe(false);
    expect(C.isPacsChannel('alex')).toBe(false);
  });
  test('isPartnerChannel should work as expected', () => {
    expect(C.isPartnerChannel('UOB')).toBe(true);
    expect(C.isPartnerChannel('EDM')).toBe(false);
    expect(C.isPartnerChannel('NML')).toBe(false);
    expect(C.isPartnerChannel('alex')).toBe(false);
  });
});
