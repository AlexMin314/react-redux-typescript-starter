import { createAction } from 'redux-act';
import { Map } from 'immutable';
// UTILS
import { actionTypePrefixer } from '@Utils/redux';
// CONSTANT
import { PROFILE as P, ADDRESS as A } from '@Constants/profile';
// ACTION TYPE HELPER
export const modelPath = 'profile';
const actionType = actionTypePrefixer('App', modelPath);
// TYPES
export interface ProfilePayload {
  [P.ADDRESSES]?: IAddresse;
  [P.AGE]?: number;
  [P.ANB]?: number;
  [P.CAMPAIGN_ID]?: string;
  [P.CHANNEL]?: string;
  [P.CLIENT_NUMBER]?: string;
  [P.CUSTOM_ID]?: string;
  [P.COUNTRY_CODE]?: string;
  [P.DOB]?: string;
  [P.EMAIL]?: string;
  [P.EREF_NO]?: string;
  [P.FIRST_NAME]?: string;
  [P.GENDER]?: string;
  [P.IDENTITY]?: number;
  [P.IS_ENTRY]?: boolean;
  [P.IS_EXISTING_CUSTOMER]?: boolean;
  [P.LAST_NAME]?: string;
  [P.LOGIN_DETAIL]?: any; // temp
  [P.NATIONALITY]?: string;
  [P.NRIC]?: string;
  [P.MEDIUM_TYPE]?: string;
  [P.MOBILE]?: string;
  [P.MOBILE_IDD]?: string;
  [P.OCCUPATION_CLASS]?: number;
  [P.OCCUPATION_DESC]?: string;
  [P.PROD_TYPE]?: string;
  [P.SMOKER]?: boolean;
  [P.SALUTATION]?: string;
  [P.RESIDENCY_CODE]?: number;
  //
  [P.HELP_DESC]?: string;
  [P.CONTACT_DAY]?: string;
  [P.CONTACT_TIME]?: string;
}

export interface IAddresse {
  [A.ADDRESS_TYPE]?: string;
  [A.BLOCK]?: string;
  [A.BUILDING_NAME]?: string;
  [A.COUNTRY]?: string;
  [A.POSTAL_CODE]?: string;
  [A.STREET_NAME]?: string;
}
export interface ProfileState extends ProfilePayload, Map<string, any> {}

type Mutators = Mutator<ProfilePayload, ProfileState>;

// INIT STATES
const profileState: ProfileState = Map({
  [modelPath]: Map(),
});

// ACTIONS
export const actions = {
  updateProfile: createAction<ProfilePayload, {}>(actionType('update_profile'), (payload) => ({ ...payload })),
};

// MUTATORS (Logics of Reducer)
export const updateProfile: Mutators = (payload) => (state) => {
  const prev = state.get(modelPath);
  return state.set(modelPath, prev.merge(payload));
};

// REDUCERS
const reducers = {
  [actions.updateProfile.toString()]: (state: ProfileState, payload: ProfilePayload) => updateProfile(payload)(state),
};

// EXPORT DUCKS
export default {
  reducers,
  actions,
  initState: profileState,
};
