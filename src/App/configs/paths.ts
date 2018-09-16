import { SERVER_ENVS } from '@/App/constants/envs';
import { isProdEnv } from '@/App/utils/envs';

export const _getApiBasePath = (serverEnv: string): string => {
  const API_BASE_PATHS = {
    [SERVER_ENVS.LOCAL]: `http://localhost:${process.env.SERVER_PORT}/d2c-service/`,
    [SERVER_ENVS.SIT]: 'https://buy-sit.prudential.com.sg/d2c-service/',
    [SERVER_ENVS.UAT]: 'https://buy-pact.prudential.com.sg/d2c-service/',
    [SERVER_ENVS.PREPROD]: 'https://buy-preprod.prudential.com.sg/d2c-service/',
    [SERVER_ENVS.PROD]: 'https://buy.prudential.com.sg/d2c-service/',
  };
  return isProdEnv
    ? '/d2c-service/'
    : (API_BASE_PATHS as any)[serverEnv];
};

export const API_BASE_PATH = _getApiBasePath(process.env.SERVER_ENV);

export const CONTEXT_PATH = isProdEnv
  ? process.env.BASE_PROD
  : process.env.BASE_DEV;

export const BASE_URL = isProdEnv
  ? process.env.BASE_PROD
  : process.env.BASE_DEV;
