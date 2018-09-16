import { injectGlobal } from '@/App/styles/styled';

export const globalStyle = () => injectGlobal`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }
`;

globalStyle();
