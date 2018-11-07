import App from '@/App/App';
import { AppGateWay } from '@/App/routes';
import { withDetection } from '@Hoc/ui';
// UTILS
import { pipe } from 'ramda';

export default pipe(
  withDetection,
  AppGateWay,
)(App);
