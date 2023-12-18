import AuthLayout from '@components/layouts/AuthLayout';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Main</div>,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    errorElement: <div>error</div>,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'sign-up',
        element: <div>Sign Up Page</div>,
      },
    ],
  },
]);

export default router;
