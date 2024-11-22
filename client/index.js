import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './components/App.jsx';
import CreateSplit from './components/routeComponents/CreateSplit.jsx';
import UpdateSplit from './components/routeComponents/UpdateSplit.jsx';
import SplitSummary from './components/routeComponents/SplitSummary.jsx';
import PastSplits from './components/routeComponents/PastSplits.jsx';
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
    path: '/createSplit',
    element: <CreateSplit />,
  },
  {
    path: '/splitSummary',
    element: <SplitSummary />,
  },
  {
    path: '/pastSplits',
    element: <PastSplits />,
  },
  {
    path: '/updateSplit',
    element: <UpdateSplit />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
