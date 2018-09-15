// Types
type Color = {
  commonRed: string;
};

interface ThemeInterface {
  color: Color;
}

// Theme details
const color: Color = {
  commonRed: '#ED1B2E',
};

// Theme obj
export const theme = {
  color,
};

export default ThemeInterface;
