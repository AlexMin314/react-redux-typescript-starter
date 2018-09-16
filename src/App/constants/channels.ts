export enum CHANNEL {
  NML = 'NML', // same as no channel.
  EDM = 'EDM',
  CRM = 'CRM',
  PRUACCESS = 'PRU',
  SCB = 'SCB',
  UOB = 'UOB',
  DIA = 'DIA',
  FAB = 'FBS',
}

export enum PACS_CHANNEL {
  EDM = 'EDM',
  CRM = 'CRM',
  PRUACCESS = 'PRU',
}

export enum PARTNER_CHANNEL {
  SCB = 'SCB',
  UOB = 'UOB',
  DIA = 'DIA',
  FAB = 'FBS',
}

export enum COMMUNICATION_MEDIUM {
  NML = 'NML',
  EDM = 'EDM',
}

export type CHANNEL_TYPES = typeof CHANNEL
  | typeof PACS_CHANNEL
  | typeof PARTNER_CHANNEL
  | typeof COMMUNICATION_MEDIUM;

export type CHANNEL_KEYS = keyof typeof CHANNEL
  | keyof typeof PACS_CHANNEL
  | keyof typeof PARTNER_CHANNEL
  | keyof typeof COMMUNICATION_MEDIUM;
