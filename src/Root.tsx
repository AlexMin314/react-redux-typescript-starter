import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/App/styles/styled';
// CONTAINERS
import App from '@/App';
// CONFIGS
import { BASE_URL } from '@/App/configs';
// TYPES
import { ThemeInterface } from '@/App/styles/theme';
import { Store } from 'redux';

export interface RootProps {
  store: Store;
  theme: ThemeInterface;
}

class Root extends PureComponent<RootProps> {
  render() {
    const { store, theme } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter basename={BASE_URL}>
            <Route path="/" component={App}/>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default hot(module)(Root);
