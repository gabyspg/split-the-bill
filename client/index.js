import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './components/App.jsx';
import CreateBill from './components/CreateBill.jsx';
import BillSummary from './components/BillSummary.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';
import { Provider } from 'react-redux';

// uncomment so that webpack can bundle styles
import styles from './scss/_app.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/newSplit',
    element: <CreateBill />,
  },
  {
    path: '/summary',
    element: <BillSummary />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
