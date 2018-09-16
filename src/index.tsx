/// <reference path='./index.d.ts'/>
import React from 'react';
import ReactDOM from 'react-dom';
// CONTAINERS
import Root from '@/Root';
// CONFIGS
import theme from './App/styles/theme';
// TYPES
import { RootProps } from '@/Root';

const render = (Component: React.ComponentType<RootProps>) => ReactDOM.render(
  (
    <Component
      store={{}}
      theme={theme}
    />
  ),
  document.getElementById('root'),
);

render(Root);
