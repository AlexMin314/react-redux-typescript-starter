import React, { PureComponent } from 'react';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'connected-react-router';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@Styles';
import { PersistGate } from 'redux-persist/integration/react';
// CONTAINERS
import App from '@/App';
// TYPES
import { ThemeInterface } from '@Styles';
import { Store } from 'redux';
import { History } from 'history';
import { Persistor } from 'redux-persist';

export interface RootProps {
  store: Store;
  history: History;
  theme: ThemeInterface;
  persistor: Persistor;
}

class Root extends PureComponent<RootProps> {
  render() {
    const {
      store,
      theme,
      history,
      persistor,
    } = this.props;
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <ConnectedRouter history={history}>
              <Route path="/" component={App}/>
            </ConnectedRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

export default hot(module)(Root);
