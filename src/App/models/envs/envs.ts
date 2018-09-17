import { createAction } from 'redux-act';
import cuid from 'cuid';
import { Map } from 'immutable';
// UTILS
import { actionTypePrefixer } from '@/App/utils';
// ACTION TYPE HELPER
const modelPath = 'envs';
const actionType = actionTypePrefixer('App', modelPath);
// TYPES
export interface EnvsState extends Map<string, any> {
  NODE_ENV?: string;
  SERVER_ENV?: string;
  sessionId?: string;
  entryUrl?: string;
}
export interface EnvsPayload {
  data: {
    entryUrl?: string,
  };
}
type Mutators = Mutator<EnvsPayload, EnvsState>;

// INIT STATES
const envsState: EnvsState = Map({
  [modelPath]: Map({
    NODE_ENV: '',
    SERVER_ENV: '',
    sessionId: '',
    entryUrl: '',
  }),
});

// ACTIONS
export const actions = {
  setEnvs: createAction<string, {}>(actionType('set_show_Consent'), (entryUrl: string) => ({ data: { entryUrl } })),
};

// MUTATORS (Logics of Reducer)
export const processEnvs: Mutators = ({ data }) => (state) => {
  const { entryUrl } = data;
  return (state)
    .set('NODE_ENV', process.env.NODE_ENV)
    .set('SERVER_ENV', process.env.SERVER_ENV)
    .set('sessionId', cuid())
    .set('entryUrl', entryUrl);
};

// REDUCERS
const reducers = {
  setEnvs: (state: EnvsState, payload: EnvsPayload) => processEnvs(payload)(state),
};

// EXPORT DUCKS
export default {
  reducers,
  actions,
  initState: envsState,
};
