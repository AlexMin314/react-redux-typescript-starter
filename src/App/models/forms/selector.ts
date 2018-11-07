import { createImmutableEqualSelector } from '@Utils/redux';
import { modelPath } from './forms';
import { Map as ImMap } from 'immutable';
import { ValidateFormsPayload as Option } from '@Models/forms';

const selectInputState = (moduleName: string) => (state: any) => state[modelPath].get(moduleName, ImMap());

export const getInputState = (option: Option) => {
  const {
    module,
    name,
    initValue = '',
  } = option;
  return createImmutableEqualSelector(
    [selectInputState(module)],
    (info: any) => info.get(name, ImMap({ value: initValue, error: '' })),
  );
};
