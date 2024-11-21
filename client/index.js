import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './components/App.jsx';
import CreateBill from './components/CreateBill.jsx';
import BillSummary from './components/BillSummary.jsx';
import PastBills from './components/PastBills.jsx';
import ReviewBill from './components/ReviewBill.jsx';
import UpdateBill from './components/UpdateBill.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';
import { Provider } from 'react-redux';
import styles from './scss/_app.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/createBill',
    element: <CreateBill />,
  },
  {
    path: '/summary',
    element: <BillSummary />,
  },
  {
    path: '/pastBills',
    element: <PastBills />,
  },
  {
    path: '/reviewBill',
    element: <ReviewBill />,
  },
  {
    path: '/updateBill',
    element: <UpdateBill />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
