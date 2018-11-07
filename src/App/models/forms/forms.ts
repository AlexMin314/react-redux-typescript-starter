import { createAction } from 'redux-act';
import { Map } from 'immutable';
// UTILS
import { actionTypePrefixer } from '@Utils/redux';
import { validators } from './validators';
// ACTION TYPE HELPER
export const modelPath = 'forms';
const actionType = actionTypePrefixer('App', modelPath);
// TYPES
export interface FormsState extends Map<string, any> {}

export interface InputInfo {
  type?: string;
  data?: any;
}
export interface ValidationInfo {
  value?: string | number | boolean;
  initValue?: string | number | boolean;
  rules: string[];
  options?: any;
}

export interface ModuleInfo {
  module: string;
  name: string;
}

export interface FormsPayload extends ModuleInfo, ValidationInfo, InputInfo {}

export interface ValidateFormsPayload extends ModuleInfo, ValidationInfo, InputInfo {}

export interface InputConfigs extends ValidationInfo, InputInfo {
  name: string;
}

export interface InitPayload {
  module: string;
  inputs: InputConfigs[];
}

export interface ValidateAllValuePayload {
  module: string;
}

type Mutators = Mutator<FormsPayload, FormsState>;
type BatchedMutators = Mutator<FormsPayload[], FormsState>;
type InitMutators = Mutator<InitPayload, FormsState>;
type ValidatorMutators = Mutator<ValidateFormsPayload, FormsState>;
type BatchedValidatorMutators = Mutator<ValidateFormsPayload[], FormsState>;
type ValidateAllValueMutators = Mutator<ValidateAllValuePayload, FormsState>;

// INIT STATES
const formsState: FormsState = Map();

// ACTIONS
export const actions = {
  setValue: createAction<FormsPayload, {}>(actionType('set_form_value')),
  setBatchedValue: createAction<FormsPayload[], {}>(actionType('set_batched_form_values')),
  setInitValueAndRules: createAction<InitPayload, {}>(actionType('set_Init_Value_And_Rules')),
  validateValue: createAction<ValidateFormsPayload, {}>(actionType('validate_form_value')),
  validateBatchedValue: createAction<ValidateFormsPayload[], {}>(actionType('validate_batched_form_value')),
  validateAllValue: createAction<ValidateAllValuePayload, {}>(actionType('validate_All_Value')),
};

// MUTATORS

// updating value
export const setInputValue: Mutators = (payload) => (state) => {
  const { module, name, value } = payload;
  return state
    .setIn([module, name, 'value'], value)
    .setIn([module, name, 'error'], '');
};

export const setBatchedValue: BatchedMutators = (payloads) => (state) => {
  return state.withMutations(prevState => payloads.forEach(payload => {
    const { module, name, value } = payload;
    prevState
      .setIn([module, name, 'value'], value)
      .setIn([module, name, 'error'], '');
  }));
};

// inits - for form hoc
export const setInitValueAndRules: InitMutators = (payload) => (state) => {
  const { module, inputs } = payload;
  return state.withMutations(prevState => inputs.forEach(input => {
    const { name, rules, options } = input;
    let initValue = input.initValue;
    if (initValue === undefined) initValue = '';
    prevState.setIn([module, name], Map({
      rules,
      options,
      value: initValue,
      error: '',
    }));
  }));
};

// validation
export const validation = (payload: any, state: any) => {
  const { module, name } = payload;
  const value = state.getIn([module, name, 'value']);
  const rules = state.getIn([module, name, 'rules'], []);
  const options = state.getIn([module, name, 'options']);
  const errors: string[] = [];

  rules.forEach((rule: string) => {
    const error: string = validators.get(rule)(value, options);
    if (error) errors.push(error);
  });

  return ({
    errors,
    firstError: errors[0],
    result: !errors[0],
  });
};

export const validateInputValue: ValidatorMutators = (payload) => (state) => {
  const { module, name } = payload;
  const { firstError, result } = validation(payload, state);
  const validationResult = state.getIn([module, 'validationResult'], Map());
  return state
    .setIn([module, name, 'error'], firstError)
    .setIn([module, 'validationResult'], validationResult.set(name, result));
};

export const validateBatchedValue: BatchedValidatorMutators = (payloads) => (state) => {
  return state.withMutations(prevState => payloads.forEach(payload => validateInputValue(payload)(prevState)));
};

export const validateAllValue: ValidateAllValueMutators = (payload) => (state) => {
  const { module } = payload;
  const inputData = state.get(module);
  const [...keys] = inputData.keys();
  const fieldNames = keys.filter((key: string) => key !== 'validationResult' && key !== 'isValidated');
  return state.withMutations(prevState => {
    fieldNames.forEach((name: string) => {
      const payload =  {
        module,
        name,
        rules: inputData.getIn([name, 'rules']),
        options: inputData.getIn([name, 'options']),
      };
      return validateInputValue(payload)(prevState);
    });
    const validationResult = prevState.getIn([module, 'validationResult'], Map());
    const isValidated = validationResult.every((v: boolean) => v === true);
    prevState.setIn([module, 'isValidated'], isValidated);
  });
};

// REDUCERS
const reducers = {
  [actions.setValue.toString()]: (state: FormsState, payload: FormsPayload) => setInputValue(payload)(state),
  [actions.setBatchedValue.toString()]: (state: FormsState, payloads: FormsPayload[]) => setBatchedValue(payloads)(state),
  [actions.setInitValueAndRules.toString()]: (state: FormsState, payload: InitPayload) => setInitValueAndRules(payload)(state),
  [actions.validateValue.toString()]: (state: FormsState, payload: ValidateFormsPayload) => validateInputValue(payload)(state),
  [actions.validateBatchedValue.toString()]: (state: FormsState, payloads: ValidateFormsPayload[]) => validateBatchedValue(payloads)(state),
  [actions.validateAllValue.toString()]: (state: FormsState, payload: ValidateAllValuePayload) => validateAllValue(payload)(state),
};

// EXPORT DUCKS
export default {
  reducers,
  actions,
  initState: formsState,
};
