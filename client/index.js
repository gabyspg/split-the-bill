import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import CreateBill from './components/CreateBill.jsx';
import SplitBill from './components/CreateBill.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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
    path: '/newSplit',
    element: <SplitBill />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
