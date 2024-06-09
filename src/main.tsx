import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import ErrorPage from '@/pages/error-page.tsx'
import Results from './pages/results.tsx'
import Root from './pages/root.tsx'
import Layout from './pages/layout.tsx'
import Episodes from './pages/episodes.tsx'
import Watch from './pages/watch.tsx'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/results/:id',
        element: <Results />,
      },
      {
        path: '/episodes/:id',
        element: <Episodes />,
      },
      {
        path: '/watch/:id',
        element: <Watch />,
      },
    ],
    errorElement: <ErrorPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
