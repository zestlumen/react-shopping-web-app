import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';
import NewProduct from './pages/NewProduct';
import MyCart from './pages/MyCart';
import NotFound from './pages/NotFound';
import './index.css';
import ProtectedRoute from './pages/ProtectedRoute';
import MyLike from './pages/MyLike';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <AllProducts />
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        )
      },
      // {
      //   path: '/products/:id',
      //   element: <ProductDetail />
      // },
      {
        path: '/products/:category',
        element: <AllProducts />
      },
      {
        path: '/products/:category/:id',
        element: <ProductDetail />
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        )
      },
      {
        path: '/mylike',
        element: (
          <ProtectedRoute>
            <MyLike />
          </ProtectedRoute>
        )
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RouterProvider router={router} />
);


