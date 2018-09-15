import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer as HotContainer } from 'react-hot-loader';

import Root from './Root';

const render = Component => ReactDOM.render(
  (
    <HotContainer>
      <Component
        store={true}
      />
    </HotContainer>
  ),
  document.getElementById('root'),
);

render(Root);
