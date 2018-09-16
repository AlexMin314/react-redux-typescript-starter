import { css } from '@/App/styles/styled';
import { ThemedCssFunction } from 'styled-components';

type Size = {
  desktop?: number,
  tablet?: number,
  phone?: number,
  xl?: number,
  lg?: number,
  md?: number,
  sm?: number,
};
interface Media<T>  {
  desktop?: ThemedCssFunction<T>;
  tablet?: ThemedCssFunction<T>;
  phone?: ThemedCssFunction<T>;
  xl?: ThemedCssFunction<T>;
  lg?: ThemedCssFunction<T>;
  md?: ThemedCssFunction<T>;
  sm?: ThemedCssFunction<T>;
}

const sizes: Size = {
  desktop: 992,
  tablet: 768,
  phone: 576,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
};

// Helpers

// Iterate through the sizes and create a media template
export const _getMedia = (sizeObj: Size): Media<Size> => Object.keys(sizeObj).reduce((acc: Media<Size>, label: keyof Size) => {
  acc[label] = (first: TemplateStringsArray, ...rest: string[]) => {
    return css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(first, ...rest)}
      }
    `;
  };
  return acc;
}, {});

export const media: Media<Size> = _getMedia(sizes);

// add more mixins
