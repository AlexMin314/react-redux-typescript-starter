import { css } from '@Styles';
import { ThemedCssFunction } from 'styled-components';

export type BreakPoints = {
  desktop?: number,
  tablet?: number,
  phone?: number,
  xl?: number,
  lg?: number,
  md?: number,
  sm?: number,
  xs?: number,
};
interface Media<T>  {
  desktop?: ThemedCssFunction<T>;
  tablet?: ThemedCssFunction<T>;
  phone?: ThemedCssFunction<T>;
  xl?: ThemedCssFunction<T>;
  lg?: ThemedCssFunction<T>;
  md?: ThemedCssFunction<T>;
  sm?: ThemedCssFunction<T>;
  xs?: ThemedCssFunction<T>;
}

export const breakPoints: BreakPoints = {
  desktop: 992,
  tablet: 768,
  phone: 576,
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xs: 0,
};

// Helpers

// Iterate through the sizes and create a media template
export const _getMedia = (sizeObj: BreakPoints): Media<BreakPoints> =>
  Object.keys(sizeObj).reduce((acc: Media<BreakPoints>, label: keyof BreakPoints) => {
    acc[label] = (first: TemplateStringsArray, ...rest: string[]) => {
      return css`
        @media (max-width: ${sizeObj[label] / 16}em) {
          ${css(first, ...rest)}
        }
      `;
    };
    return acc;
  },
{});

export const media: Media<BreakPoints> = _getMedia(breakPoints);

// add more utils
