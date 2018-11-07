/// <reference path='./index.d.ts'/>
import React from 'react';
import ReactDOM from 'react-dom';
// CONTAINERS
import Root from '@/Root';
// CONFIGS
import { store, persistor } from '@/App/store';
import { history } from '@/App/store/_storeConfig';
import { theme } from '@Styles';
import '@/App/configs/api';
// ASSETS
import './index.css';
import '@Styles/globalStyle';
// TYPES
import { RootProps } from '@/Root';
// Polyfill
import smoothscroll from 'smoothscroll-polyfill';

const render = (Component: React.ComponentType<RootProps>) => ReactDOM.render(
  (
    <Component
      store={store}
      persistor={persistor}
      history={history}
      theme={theme}
    />
  ),
  document.getElementById('root'),
);

render(Root);
smoothscroll.polyfill();
