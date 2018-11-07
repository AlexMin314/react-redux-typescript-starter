import { breakPoints } from './styleUtils';
import { BreakPoints } from './styleUtils';

// Types
type Color = {
  primeRed: string,
  primeRedLight: string,
  white: string,
  whiteSmoke:string,
  lightBlue: string,
  lightGrey: string,
  grey: string,
  darkGrey: string,
  darkerGrey: string,
  textGrey: string,
  linkGrey: string,
  labelGrey: string,
  labelBlueGrey: string,
  borderGrey: string,
  cardGrey: string,
  inputGrey: string,
  black: string,
  selectHover: string,
  boxShadow: string,
  background: string,
  background1: string,
  background2: string,
  background3: string,
};

export interface ThemeInterface {
  color: Color;
  breakPoints: BreakPoints;
}

// Todo: refactor based on color and usage.
const colorBase = {
  lightBlueGrey: '#68737a',
  brightGrey: '#e4e4e4',
};

// Theme details
const color: Color = {
  primeRed: '#ed1b2e',
  primeRedLight: '#f81626',
  white: '#FFFFFF',
  whiteSmoke: '#F5F5F5',
  lightBlue: colorBase.lightBlueGrey,
  lightGrey: '#A8A8A8',
  grey: '#646464',
  darkGrey: '#48484A',
  darkerGrey: '#292f34',
  textGrey: '#666666',
  linkGrey: '#9b9b9b',
  labelGrey: '#a8a8a8',
  labelBlueGrey: colorBase.lightBlueGrey,
  borderGrey: '#d7d2ce',
  cardGrey: colorBase.brightGrey,
  inputGrey: colorBase.brightGrey,
  black: '#000000',
  selectHover: '#ffb81d',
  boxShadow: '#e7e7e7',
  background: '#f5f5f5',
  background1: '#f0ebe5',
  background2: '#d8d3ce',
  background3: '#d7d7d7',
};

// Theme obj
export const theme = {
  color,
  breakPoints,
};
