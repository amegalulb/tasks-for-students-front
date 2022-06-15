import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import type {} from '@mui/lab/themeAugmentation';
import { BrowserRouter } from 'react-router-dom';

import { Router } from './app/routes';
import { ThemeProvider } from './theme';
import { store } from './app/store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <HelmetProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </HelmetProvider>
    </Provider>
  </BrowserRouter>
);

export default App;
