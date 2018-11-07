import { VALID_RULES, VALID_ERRORS } from '@Constants/validations';

// VALIDATOR RULES
export const validators = new Map();

validators.set(VALID_RULES.NRIC, (value: string, options: any): string => {
  const predicate = value && !_validateNric(value);
  return predicate ? VALID_ERRORS[VALID_RULES.NRIC] : '';
});

validators.set(VALID_RULES.DOB, (value: string, options: any): string => {
  const predicate = value && value.length !== 10;
  return predicate ? VALID_ERRORS[VALID_RULES.DOB] : '';
});

validators.set(VALID_RULES.REQ, (value: (string | boolean | number), options: any): string => {
  let predicate = !value;
  if (typeof value === 'number') predicate = value < -1;
  if (typeof value === 'boolean') predicate = false;
  return predicate ? VALID_ERRORS[VALID_RULES.REQ] : '';
});

validators.set(VALID_RULES.EMAIL, (value: string, options: any): string => {
  const predicate = !_validateEmail(value);
  return predicate ? VALID_ERRORS[VALID_RULES.EMAIL] : '';
});

// HELPERS
export const _validateNric = (str: string) => {
  if (str !== null && str !== undefined) {
    if (str.length !== 9) {
      return false;
    }
    const strUpperCase = str.toUpperCase();

    let i;
    const icArray: any[] = [];
    for (i = 0; i < 9; i++) {
      icArray[i] = strUpperCase.charAt(i);
    }

    icArray[1] = parseInt(icArray[1], 10) * 2;
    icArray[2] = parseInt(icArray[2], 10) * 7;
    icArray[3] = parseInt(icArray[3], 10) * 6;
    icArray[4] = parseInt(icArray[4], 10) * 5;
    icArray[5] = parseInt(icArray[5], 10) * 4;
    icArray[6] = parseInt(icArray[6], 10) * 3;
    icArray[7] = parseInt(icArray[7], 10) * 2;

    let weight = 0;
    for (i = 1; i < 8; i++) {
      weight += icArray[i];
    }

    const offset = (icArray[0] === 'T' || icArray[0] === 'G') ? 4 : 0;
    const temp = (offset + weight) % 11;

    const st = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
    const fg = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];

    let theAlpha;
    if (icArray[0] === 'S' || icArray[0] === 'T') {
      theAlpha = st[temp];
    } else if (icArray[0] === 'F' || icArray[0] === 'G') {
      theAlpha = fg[temp];
    }

    return (icArray[8] === theAlpha);
  }
  return true;
};

export const _validateEmail = (email: string) => {
  // tslint:disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
