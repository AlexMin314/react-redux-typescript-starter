import * as React from 'react';
import styled from '@/App/styles/styled';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { _getMedia, media } from '@/App/styles/styleUtils';

describe('Media Util', () => {
  test('getMedia helper must return an object type', () => {
    expect(_getMedia({})).toBeInstanceOf(Object);
  });

  test('getMedia helper must return the desired property type', () => {
    const mockObj = { desktop: 992 };
    expect(_getMedia(mockObj).desktop).toBeInstanceOf(Function);
  });

  test('getMedia helper must return the desired property names', () => {
    const mockObj = { desktop: 992 };
    const result = _getMedia(mockObj);
    expect(result).toHaveProperty('desktop');
    expect(result).not.toHaveProperty('tablet');
  });

  test('media must be an object type', () => {
    expect(media).toBeInstanceOf(Object);
  });

  test('once media is created, it should work as expect with React styled-component', () => {
    const mockObj = { desktop: 992 };
    const media = _getMedia(mockObj);

    type Props = { primary: boolean };

    const MockComponent = styled<Props, 'div'>('div')`
      background: blue;
      ${({ primary }) => primary && 'color: black;'}
      ${media.desktop`
        background: green;
        &:hover {
          color: red;
        }
      `}
    `;

    const tree = renderer.create(<MockComponent primary={true} />).toJSON();

    expect(tree).toHaveStyleRule('color', 'black');
    expect(tree).toHaveStyleRule('background', 'blue');
    expect(tree).toHaveStyleRule('background', 'green', {
      media: `(max-width:${mockObj.desktop / 16}em)`,
    });
    expect(tree).toHaveStyleRule('color', 'red', {
      media: `(max-width:${mockObj.desktop / 16}em)`,
      modifier: ':hover',
    });
  });
});
