import './styles/globals.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App';
import Home from './routes/Home';
import ValidateCertificate from './routes/ValidateCertificate';
import IssueCertificate from './routes/IssueCertificate';
import Roles from './routes/Roles';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/roles",
        element: <Roles />,
      },
      {
        path: "/validate",
        element: <ValidateCertificate />,
      },
      {
        path: "/issue",
        element: <IssueCertificate />,
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
