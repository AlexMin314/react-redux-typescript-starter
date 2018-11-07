import { createImmutableEqualSelector } from '@Utils/redux';
// CONSTANTS
import { modelPath } from './profile';
// import { PROFILE as P } from '@Constants/profile';

const selectProfile = (state: any) => state.app.get(modelPath);

export const getProfile = createImmutableEqualSelector(
  [selectProfile],
  (info: any) => info,
);
