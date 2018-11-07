import { createImmutableEqualSelector } from '@Utils/redux';
// CONSTANTS
import { modelPath } from './configs';
import { CONFIG as C } from '@Constants/config';

const selectResponsive = (state: any) => state.app.get(modelPath).get(C.IS_LANDSCAPE, false);
const selectLoadingInfo = (state: any) => state.app.get(modelPath).get(C.IS_LOADING, false);

export const getIsLandScape = createImmutableEqualSelector(
  [selectResponsive],
  (info: any) => info,
);

export const getIsLoading = createImmutableEqualSelector(
  [selectLoadingInfo],
  (info: any) => info,
);
