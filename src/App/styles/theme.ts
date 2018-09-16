// Types
type Color = {
  commonRed: string;
};

export interface ThemeInterface {
  color: Color;
}

// Theme details
const color: Color = {
  commonRed: '#ED1B2E',
};

// Theme obj
const theme = {
  color,
};

export default theme;
