import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import CreateBill from './components/routeComponents/CreateBill.jsx';
import SplitSummary from './components/routeComponents/SplitSummary.jsx';
import PastBills from './components/routeComponents/PastBills.jsx';
import UpdateBill from './components/routeComponents/UpdateBill.jsx';
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
    element: <SplitSummary />,
  },
  {
    path: '/pastBills',
    element: <PastBills />,
  },
  {
    path: '/reviewBill',
    element: <SplitSummary />,
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
