import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import EditReceiptInfo from './components/routeComponents/EditReceiptInfo.jsx';
import SplitSummary from './components/routeComponents/SplitSummary.jsx';
import PastSplits from './components/routeComponents/PastSplits.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import styles from './scss/_appDarkMode.scss';
import ScrollToTop from './utils/ScrollToTop.js';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const routes = [
  { path: '/', element: <App /> },
  { path: '/newReceipt', element: <EditReceiptInfo key="newReceipt" /> },
  { path: '/updateReceipt', element: <EditReceiptInfo key="updateReceipt" /> },
  { path: '/splitSummary', element: <SplitSummary /> },
  { path: '/pastSplits', element: <PastSplits /> },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ScrollToTop />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </Provider>
);
