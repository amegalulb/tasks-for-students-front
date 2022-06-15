// material
import { CssBaseline, Theme } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';
import { FCWithChildren } from '../shared/types/FCWithChildren';

// ----------------------------------------------------------------------

const themeOptions = {
  palette,
  shape: { borderRadius: 8 },
  typography,
  shadows,
  customShadows,
};

export type CustomTheme = Theme & { customShadows: typeof customShadows };
// @ts-ignore
const theme: CustomTheme = createTheme<typeof themeOptions>(themeOptions);
theme.components = componentsOverride(theme);

export const ThemeProvider: FCWithChildren = ({ children }) => (
  <StyledEngineProvider injectFirst>
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  </StyledEngineProvider>
);
