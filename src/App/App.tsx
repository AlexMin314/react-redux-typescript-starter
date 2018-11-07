import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Routes } from '@/App/routes';
// ASSETS
import { favicon } from '@/App/assets';
// UTILS
import { isProdEnv } from '@/App/utils/envs';
// TYPES
import { RouteComponentProps } from 'react-router';

export interface IAppProps extends RouteComponentProps<any> {}

class App extends Component<IAppProps> {
  render() {
    return (
      <Fragment>
        {/* Meta tag setups */}
        <Helmet>
          {isProdEnv && (
            <meta
              http-equiv="Content-Security-Policy"
              content={
              /* tslint:disable */
              `default-src 'self' 'unsafe-inline' 'unsafe-eval' data:;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.google-analytics.com *.googletagmanager.com *.googleapis.com *.cloudfront.net *.google.com *.google.com.sg *.facebook.net *.serving-sys.com *.webtrends.com *.webtrendslive.com *.googleadservices.com *.g.doubleclick.net data:;
              style-src 'self' 'unsafe-inline' *.prudential.com.sg *.googleapis.com *.google.com *.google.com.sg data: blob:;
              img-src 'self' 'unsafe-inline' *.google-analytics.com *.googletagmanager.com maps.googleapis.com *.gstatic.com *.g.doubleclick.net *.google.com *.google.com.sg gtrk.s3.amazonaws.com data:;
              frame-src *;
              child-src *;
              font-src *;`
              /* tslint:enable */
              }
            />
          )}
        </Helmet>
        {/* App Routes */}
        <Routes />
      </Fragment>
    );
  }
}

export default App;
