import { borderSize, fontSizes } from './constants';

interface IPalette {
  main: string;
  contrastText: string;
}

interface IAccent {
  light: string;
  medium: string;
  dark: string;
}

export type Theme = {
  borderRadius: number | string;
  fontSize: {
    xsmall: number | string;
    small: number | string;
    medium: number | string;
    large: number | string;
    xlarge: number | string;
  };
  screen: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
  };
  palette: {
    common: {
      black: string;
      white: string;
    };
    accent: IAccent;
    primary: IPalette;
    secondary: IPalette;
  };
  shadow: {
    light: string;
  };
};

const baseTheme = {
  borderRadius: `${borderSize}px`,
  fontSize: {
    xsmall: `${fontSizes.xsmall}px`,
    small: `${fontSizes.small}px`,
    medium: `${fontSizes.medium}px`,
    large: `${fontSizes.large}px`,
    xlarge: `${fontSizes.xlarge}px`,
  },
  screen: {
    xsmall: '750px',
    small: '900px',
    medium: '1150px',
    large: '1500px',
  },
  shadow: {
    light: '#EAE8EC',
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  palette: {
    common: {
      black: '#222831',
      white: '#fff',
    },
    accent: {
      light: '#FFB81C',
      medium: '#B31942',
      dark: '#7D4016',
    },
    primary: {
      main: '#6CACE4',
      contrastText: '#7D4016',
    },
    secondary: {
      main: '#0A3161',
      contrastText: '#fff',
    },
  },
};

export const darkTheme: Theme = {
  ...baseTheme,
  palette: {
    common: {
      black: '#222831',
      white: '#fff',
    },
    accent: {
      light: '#FFB81C',
      medium: '#B31942',
      dark: '#7D4016',
    },
    primary: {
      main: '#6CACE4',
      contrastText: '#0A3161',
    },
    secondary: {
      main: '#0A3161',
      contrastText: '#fff',
    },
  },
};
