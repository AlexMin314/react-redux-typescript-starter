import React, { PureComponent, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Routes from './Routes';
// ASSETS
import { favicon } from '@Assets';
// UTILS
import { isProdEnv } from '@Utils/envs';
// TYPES
export interface AppProps {}

class App extends PureComponent<AppProps> {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Prudential</title>
          <link rel="shortcut icon" type="image/icon" href={favicon} />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
          {/* <meta name="referrer" content="no-referrer|no-referrer-when-downgrade|origin|origin-when-crossorigin|unsafe-url" /> */}
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta http-equiv="cache-control" content="no-cache" />
          <meta http-equiv="expires" content="0" />
          <meta http-equiv="pragma" content="no-cache" />
          <meta http-equiv="Strict-Transport-Security" content="no-cache" />
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
        <Routes />
      </Fragment>
    );
  }
}

export default App;
