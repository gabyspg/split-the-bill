import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import { store } from './store';
import { Provider } from 'react-redux';
import styles from './scss/_appDarkMode.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from './utils/themeMUI.js';
import { ThemeProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LocalizationProvider>
  </Provider>
);
