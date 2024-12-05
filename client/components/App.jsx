import React from 'react';
import NavBar from './NavBar.jsx';
import EditReceiptInfo from './routeComponents/EditReceiptInfo.jsx';
import SplitSummary from './routeComponents/SplitSummary.jsx';
import PastSplits from './routeComponents/PastSplits.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop.js';
import Home from './routeComponents/Home.jsx';

const App = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: '/newReceipt', element: <EditReceiptInfo key="newReceipt" /> },
    {
      path: '/updateReceipt',
      element: <EditReceiptInfo key="updateReceipt" />,
    },
    { path: '/splitSummary', element: <SplitSummary /> },
    { path: '/pastSplits', element: <PastSplits /> },
  ];

  return (
    <div className="app">
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ScrollToTop />
        <NavBar />
        <Routes>
          {routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
