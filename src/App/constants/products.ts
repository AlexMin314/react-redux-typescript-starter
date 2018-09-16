export enum ET {
  TYPE = 'ET',
}

export enum PA {
  TYPE = 'PA',
}

export enum PFC {
  TYPE = 'PFC',
}

export enum PGRP {
  TYPE = 'PGRP',
}

export enum PGP {
  TYPE = 'PGP',
}

export enum PL {
  TYPE = 'PL',
}

export enum PLMF {
  TYPE = 'PLMF',
}

export enum PM {
  TYPE = 'PM',
}

export enum PS {
  TYPE = 'PS',
}

export enum PT {
  TYPE = 'PT',
}

export enum PTP {
  TYPE = 'PTP',
}

export enum PTV {
  TYPE = 'PTV',
}

export interface IPRODUCT {
  ET: typeof ET;
  PA: typeof PA;
  PFC: typeof PFC;
  PGRP: typeof PGRP;
  PGP: typeof PGP;
  PL: typeof PL;
  PLMF: typeof PLMF;
  PM: typeof PM;
  PS: typeof PS;
  PT: typeof PT;
  PTP: typeof PTP;
  PTV: typeof PTV;
}

export const PRODUCT: IPRODUCT = {
  ET,
  PA,
  PFC,
  PGRP,
  PGP,
  PL,
  PLMF,
  PM,
  PS,
  PT,
  PTP,
  PTV,
};
Object.freeze(PRODUCT);
